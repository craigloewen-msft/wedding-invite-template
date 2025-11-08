
const { app } = require('@azure/functions');
const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables');

const tableName = "WeddingResponses";
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

const credential = new AzureNamedKeyCredential(accountName, accountKey);
const tableClient = new TableClient(
    `https://${accountName}.table.core.windows.net`,
    tableName,
    credential
);

app.http('wedding-response', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        let inviteId, name, reservedCount, days, personInfoArray, hotelPreference;
        if (request.method === 'GET') {
            inviteId = request.query.get('inviteId');
            name = request.query.get('name');
            reservedCount = request.query.get('reservedCount');
            days = request.query.get('days');
            personInfoArray = request.query.get('personInfoArray');
            hotelPreference = request.query.get('hotelPreference');
        } else if (request.method === 'POST') {
            const body = await request.json();
            inviteId = body.inviteId;
            name = body.name;
            reservedCount = body.reservedCount;
            days = body.days;
            personInfoArray = body.personInfoArray;
            hotelPreference = body.hotelPreference;
        }

        // Only name (group name) is strictly required
        if (!name) {
            return { status: 400, body: "Missing 'name' (group name)" };
        }

        // Table entity must have partitionKey and rowKey
        const entity = {
            partitionKey: "wedding",
            rowKey: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            inviteId: inviteId || null,
            name,
            reservedCount: reservedCount || null,
            days: days ? JSON.stringify(days) : null,
            personInfoArray: personInfoArray ? JSON.stringify(personInfoArray) : null,
            hotelPreference: hotelPreference,
            timestamp: new Date().toISOString()
        };

        try {
            await tableClient.createEntity(entity);
            return { status: 200, body: "RSVP submitted successfully!" };
        } catch (err) {
            context.log.error("Error writing to table:", err);
            return { status: 500, body: err.message || "Error saving response." };
        }
    }
});
