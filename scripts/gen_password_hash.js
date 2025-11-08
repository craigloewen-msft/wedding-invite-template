#!/usr/bin/env node
const crypto = require('crypto')

const password = process.argv[2]
if (!password) {
  console.error('Usage: node scripts/gen_password_hash.js <password>')
  process.exit(1)
}

const iterations = process.env.PBKDF2_ITERATIONS ? Number(process.env.PBKDF2_ITERATIONS) : 200000
const salt = crypto.randomBytes(16)
const keylen = 32
const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, 'sha256')

console.log(`VITE_PASSWORD_HASH=${hash.toString('hex')}` + "\n" + `VITE_PASSWORD_SALT=${salt.toString('hex')}` + "\n" + `VITE_PASSWORD_ITERATIONS=${iterations}`)
