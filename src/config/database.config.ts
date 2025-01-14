export const databaseConfig = () => ({
    DB_HOST : process.env.MYSQL_HOST || 'localhost',
    DB_PORT : process.env.MYSQL_PORT || 3306,
    DB_NAME : process.env.MYSQL_DATABASE || 'nest_tester',
    DB_USER : process.env.MYSQL_USERNAME || 'root',
    DB_PASS : process.env.MYSQL_PASSWORD || '',
    DB_SYNC : process.env.MYSQL_SYNCHRONIZE || true,
});