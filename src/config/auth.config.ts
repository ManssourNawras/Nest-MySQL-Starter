export const authConfig = () => ({
    JWT_SECRET: process.env.JWT_SECRET || 'tester',
    JWT_EXPIRATION : process.env.JWT_EXPIRATION_DB_LOCAL || 3600,
});