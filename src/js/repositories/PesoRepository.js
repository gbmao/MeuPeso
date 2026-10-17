export class PesoRepository {
  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.bancoPromise = null;
  }

  async conectar() {
    if (!this.bancoPromise) {
      this.bancoPromise = this.abrirBanco();
    }

    return this.bancoPromise;
  }

  async abrirBanco() {
    const banco = await this.sqlite.createConnection(
      'meu_peso',
      false,
      'no-encryption',
      1,
      false
    );

    await banco.open();

    await banco.execute(`
      CREATE TABLE IF NOT EXISTS pesagens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        peso REAL NOT NULL,
        recebido_em TEXT NOT NULL
      );
    `);

    return banco;
  }

  async salvar(peso) {
    const banco = await this.conectar();

    await banco.run(
      `INSERT INTO pesagens (peso, recebido_em)
       VALUES (?, ?)`,
      [peso, new Date().toISOString()]
    );
  }

  async listar() {
    const banco = await this.conectar();

    const resultado = await banco.query(`
      SELECT id, peso, recebido_em
      FROM pesagens
      ORDER BY recebido_em DESC
    `);

    return resultado.values ?? [];
  }
}