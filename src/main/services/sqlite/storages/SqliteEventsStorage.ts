import Event from '@entities/events/Event';
import FilterOptions from '@entities/filters/FilterOptions';
import Stock from '@entities/stocks/Stock';
import StockType from '@entities/stocks/StockType';
import SqliteEventMapper from '@services/sqlite/mappers/SqliteEventMapper';
import SqliteEventModel from '@services/sqlite/models/sqlite_event_model';
import SqliteStockMapper from '@sqlite/mappers/sqlite_stock_mapper';
import { Database, Statement, Transaction } from 'better-sqlite3';
import EventsStorage from 'main/storage/events_storage';

class SqliteEventsStorage implements EventsStorage {
  countEventsStatement: Statement;

  insertEventStatement: Statement;
  insertManyEventsStatement: Transaction;

  deleteEventsStatement: Statement;

  updateEventsStatement: Transaction;

  filterStatement: Statement;

  findAllStatement: Statement;
  findEventsByStockStatement: Statement;
  findEventsByStockAndDateStatement: Statement;
  findStocksThatHaveAnyEventStatement: Statement;

  constructor(db: Database) {
    this.countEventsStatement = db.prepare(
      `
        SELECT COUNT(*) as count FROM events
      `,
    );

    this.insertEventStatement = db.prepare(
      `
        INSERT INTO events (quantity, date, type, total_value, unit_price, stock_ticker)
        VALUES (@quantity, @date, @type, @total_value, @unit_price, @stock_ticker)
      `,
    );

    this.insertManyEventsStatement = db.transaction(
      (events: SqliteEventModel[]) => {
        for (const event of events) this.insertEventStatement.run(event);
      },
    );

    this.deleteEventsStatement = db.prepare(
      `
        DELETE FROM events
        WHERE stock_ticker=@stock_ticker
      `,
    );

    this.updateEventsStatement = db.transaction(
      (stock: Stock, events: SqliteEventModel[]) => {
        const { ticker } = stock;
        this.deleteEventsStatement.run({ stock_ticker: ticker });
        this.insertManyEventsStatement(events);
      },
    );

    const findEventsByStatement = (whereClause: string) =>
      `
        SELECT 
          events.*, 
          stocks.name as stock_name, 
          stocks.type as stock_type, 
          stocks.currency_code as stock_currency_code
        FROM events 
        LEFT JOIN stocks 
        ON stocks.ticker=events.stock_ticker
        WHERE ${whereClause}
      `;

    this.filterStatement = db.prepare(
      findEventsByStatement('1=1 LIMIT @pageSize OFFSET @offset'),
    );

    this.findAllStatement = db.prepare(findEventsByStatement('1=1'));

    this.findEventsByStockAndDateStatement = db.prepare(
      findEventsByStatement(
        `
          date=@date 
          AND stock_ticker=@stock_ticker
        `,
      ),
    );

    this.findEventsByStockStatement = db.prepare(
      findEventsByStatement(
        `
          stock_ticker=@stock_ticker
        `,
      ),
    );

    this.findStocksThatHaveAnyEventStatement = db.prepare(
      `
        SELECT 
          stocks.name as name, 
          stocks.ticker as ticker,
          stocks.type as type,
          stocks.currency_code as currency_code
        FROM stocks
        INNER JOIN events
        ON events.stock_ticker=stocks.ticker
        WHERE stocks.type=@type
        GROUP BY name, ticker
      `,
    );
  }

  static createEventsTable(db: Database) {
    db.prepare(
      `
        CREATE TABLE IF NOT EXISTS events (
          quantity DECIMAL, 
          date DATE, 
          type CHAR, 
          total_value DECIMAL,
          unit_price DECIMAL,
          stock_ticker VARCHAR,
          FOREIGN KEY (stock_ticker) REFERENCES stocks (ticker) ON UPDATE CASCADE
        )
      `,
    ).run();
  }

  async count() {
    return this.countEventsStatement.get().count;
  }

  async filter(filterOptions: FilterOptions) {
    const { page, pageSize } = filterOptions;
    const docs = this.filterStatement.all({
      pageSize,
      offset: page * pageSize,
    });

    return docs.map(SqliteEventMapper.fromModel);
  }

  async findAll() {
    const docs: SqliteEventModel[] = this.findAllStatement.all();

    return docs.map(SqliteEventMapper.fromModel);
  }

  async save(event: Event) {
    const model = SqliteEventMapper.toModel(event);

    this.insertEventStatement.run(model);
  }

  async saveMany(events: Event[]) {
    const models = events.map(SqliteEventMapper.toModel);

    this.insertManyEventsStatement(models);
  }

  async findEventsByStockAndDate(stock: Stock, date: Date): Promise<Event[]> {
    const { ticker } = stock;
    const docs: SqliteEventModel[] = this.findEventsByStockAndDateStatement.all(
      {
        date: date.toISOString(),
        stock_ticker: ticker,
      },
    );

    return docs.map(SqliteEventMapper.fromModel);
  }

  async findEventsByStock(stock: Stock): Promise<Event[]> {
    const { ticker } = stock;
    const docs: SqliteEventModel[] = this.findEventsByStockStatement.all({
      stock_ticker: ticker,
    });

    return docs.map(SqliteEventMapper.fromModel);
  }

  async findStocksThatHaveAnyEvent(type: StockType): Promise<Stock[]> {
    const docs = this.findStocksThatHaveAnyEventStatement.all({ type });

    return docs.map(SqliteStockMapper.fromModel);
  }
}

export default SqliteEventsStorage;
