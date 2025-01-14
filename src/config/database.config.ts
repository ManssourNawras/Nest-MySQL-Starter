export const databaseConfig = () => ({
    DB_HOST        : process.env.DB_HOST || 'localhost',
    DB_PORT        : process.env.DB_PORT || 3306,
    DB_DATABASE    : process.env.DB_DATABASE || 'nest_tester',
    DB_USERNAME    : process.env.DB_USERNAME || 'root',
    DB_PASSWORD    : process.env.DB_PASSWORD || '',
    DB_SYNCHRONIZE : process.env.DB_SYNCHRONIZE || true,
});