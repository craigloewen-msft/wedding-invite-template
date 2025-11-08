export function hexToUint8Array(hex) {
  if (!hex) return new Uint8Array()
  const pairs = hex.match(/.{1,2}/g) || []
  return new Uint8Array(pairs.map(byte => parseInt(byte, 16)))
}

export function bufferToHex(buffer) {
  const bytes = new Uint8Array(buffer)
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function derivePBKDF2Hex(password, saltHex, iterations = 200000, keyLen = 32) {
  const enc = new TextEncoder()
  const pwKey = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits'])
  const salt = hexToUint8Array(saltHex)
  const derivedBits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, pwKey, keyLen * 8)
  return bufferToHex(derivedBits)
}

export function constantTimeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}
