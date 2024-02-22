import { Client, Account, Databases } from 'appwrite'

export const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65c780667a82cc1c3649')
export const databases = new Databases(client)
export const account = new Account(client)
export { ID } from 'appwrite'
