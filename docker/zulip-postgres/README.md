# Zulip-compatible PostgreSQL

This starts a local PostgreSQL 14 database using Zulip's PostgreSQL image recipe from `reference/oss/zulip`.

It creates:

- database: `zulip`
- role: `zulip`
- password: `zulipdev`
- PGroonga extension in the `zulip` database

Run it with:

```powershell
docker compose -f docker-compose.zulip-db.yml up -d --build
```

Connection URL:

```text
postgresql://zulip:zulipdev@localhost:5433/zulip
```

Verify it with:

```powershell
docker exec link-life-zulip-postgres psql -U zulip -d zulip -c "select current_database(), current_user;"
docker exec link-life-zulip-postgres psql -U zulip -d zulip -c "select extname from pg_extension where extname = 'pgroonga';"
```

Stop it with:

```powershell
docker compose -f docker-compose.zulip-db.yml down
```

Reset the database from scratch with:

```powershell
docker compose -f docker-compose.zulip-db.yml down -v
docker compose -f docker-compose.zulip-db.yml up -d --build
```

This is a Zulip-ready PostgreSQL database bootstrap. Zulip's application tables are created by Zulip's Django migrations when the Zulip app is pointed at this database.
