const { app } = require('@azure/functions');
const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables');

const tableName = "WeddingInvites";
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

const credential = new AzureNamedKeyCredential(accountName, accountKey);
const tableClient = new TableClient(
    `https://${accountName}.table.core.windows.net`,
    tableName,
    credential
);

app.http('get-invite-details', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url: "${request.url}"`);

        const inviteId = request.query.get('invite-id');

        if (!inviteId) {
            return { 
                status: 400, 
                body: "Missing 'invite-id' parameter" 
            };
        }

        try {
            // Query the table for the invite with this ID
            // Using partitionKey as "invite" and rowKey as the inviteId
            const entity = await tableClient.getEntity("invite", inviteId);
            
            // Return the invite details
            return { 
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: entity.name || '',
                    reservedCount: entity.reservedCount || 1,
                    hotel: entity.hotel || false
                })
            };
        } catch (err) {
            if (err.statusCode === 404) {
                context.log.error("Invite not found:", inviteId);
                return { 
                    status: 404, 
                    body: "Invite not found" 
                };
            }
            context.log.error("Error reading from table:", err);
            return { 
                status: 500, 
                body: err.message || "Error retrieving invite details." 
            };
        }
    }
});
