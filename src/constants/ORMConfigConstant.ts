
export default {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'sebastian',
    password: 'admin',
    database: 'sebastiandb',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/../migrations/*{.ts,.js}']
};