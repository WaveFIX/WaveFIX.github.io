create table users (
  id bigint primary key generated always as identity,
  name text,
  email text unique not null,
  password text not null
);

create table logins (
  id bigint primary key generated always as identity,
  email text not null,
  password text not null,
  login_time timestamp with time zone default now()
);

alter table users
add column password_hash text;

alter table users
drop password;

alter table logins
add column password_hash text;

alter table logins
drop password;

alter table logins
add constraint unique_email unique (email);

alter table logins
add constraint fk_email foreign key (email) references users (email);

create index idx_users_email on users using btree (email);
