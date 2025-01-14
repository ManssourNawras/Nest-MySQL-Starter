export const authConfig = () => ({
    JWT_SECRET: process.env.JWT_SECRET || 'tester',
    JWT_EXPIRATION : process.env.DATABASEJWT_EXPIRATION_DB_LOCAL || 3600,
});