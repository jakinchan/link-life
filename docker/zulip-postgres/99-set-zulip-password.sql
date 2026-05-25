\connect postgres
ALTER ROLE zulip WITH LOGIN PASSWORD 'zulipdev';
ALTER ROLE zulip SET search_path TO zulip,public,pgroonga,pg_catalog;
