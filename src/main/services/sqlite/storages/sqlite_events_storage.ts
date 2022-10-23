import Event from '@entities/event/event';
import Stock from '@entities/stock/stock';
import StockType from '@entities/stock/stock_type';
import SqliteEventMapper from '@services/sqlite/mappers/sqlite_event_mapper';
import SqliteEventModel from '@services/sqlite/models/sqlite_event_model';
import SqliteStockMapper from '@sqlite/mappers/sqlite_stock_mapper';
import { Database, Statement, Transaction } from 'better-sqlite3';
import EventsStorage from 'main/storage/events_storage';

class SqliteEventsStorage implements EventsStorage {
  insertEventStatement: Statement;
  insertManyEventsStatement: Transaction;

  deleteEventsStatement: Statement;

  updateEventsStatement: Transaction;

  findEventsByDateStatement: Statement;
  findEventsByStockStatement: Statement;
  findStocksThatHaveAnyEventStatement: Statement;

  constructor(db: Database) {
    this.insertEventStatement = db.prepare(
      `
        INSERT INTO events (quantity, date, type, price_value, price_code, stock_ticker)
        VALUES (@quantity, @date, @type, @price_value, @price_code, @stock_ticker)
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
        SELECT events.*, stocks.name as stock_name, stocks.type as stock_type 
        FROM events 
        LEFT JOIN stocks 
        ON stocks.ticker=events.stock_ticker
        WHERE ${whereClause}
      `;

    this.findEventsByDateStatement = db.prepare(
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
        SELECT stocks.name as name, stocks.ticker as ticker, stocks.type as type
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
          price_value DECIMAL, 
          price_code CHAR,
          stock_ticker VARCHAR,
          FOREIGN KEY (stock_ticker) REFERENCES stocks (ticker) ON UPDATE CASCADE
        )
      `,
    ).run();
  }

  async saveEvents(stock: Stock, events: Event[]) {
    const models = events.map(SqliteEventMapper.toModel);

    return this.updateEventsStatement(stock, models);
  }

  async findEventsByDate(stock: Stock, date: Date): Promise<Event[]> {
    const { ticker } = stock;
    const docs: SqliteEventModel[] = this.findEventsByDateStatement.all({
      date: date.toISOString(),
      stock_ticker: ticker,
    });

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