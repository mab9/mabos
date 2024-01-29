CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE customer (
                          customer_id serial PRIMARY KEY,
                          email VARCHAR(100) NOT NULL,
                          name VARCHAR(100) NOT NULL,
                          mobile_number VARCHAR(14) NOT NULL,
                          password VARCHAR(100) NOT NULL,
                          role VARCHAR(100) NOT NULL,
                          create_dt timestamp NOT NULL
);


CREATE TABLE accounts (
                          customer_id int NOT NULL,
                          account_number int NOT NULL PRIMARY KEY,
                          account_type varchar(100) NOT NULL,
                          branch_address varchar(200) NOT NULL,
                          create_dt timestamp DEFAULT NULL,
                          CONSTRAINT customer_ibfk_1 FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE CASCADE
);

CREATE TABLE account_transactions (
                                      transaction_id varchar(200) NOT NULL PRIMARY KEY,
                                      account_number int NOT NULL,
                                      customer_id int NOT NULL,
                                      transaction_dt timestamp NOT NULL,
                                      transaction_summary varchar(200) NOT NULL,
                                      transaction_type varchar(100) NOT NULL,
                                      transaction_amt int NOT NULL,
                                      closing_balance int NOT NULL,
                                      create_dt timestamp DEFAULT NULL,
                                      CONSTRAINT accounts_ibfk_2 FOREIGN KEY (account_number) REFERENCES accounts (account_number) ON DELETE CASCADE,
                                      CONSTRAINT acct_user_ibfk_1 FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE CASCADE
);

CREATE TABLE loans (
                       loan_number serial PRIMARY KEY,
                       customer_id int NOT NULL,
                       start_dt timestamp NOT NULL,
                       loan_type varchar(100) NOT NULL,
                       total_loan int NOT NULL,
                       amount_paid int NOT NULL,
                       outstanding_amount int NOT NULL,
                       create_dt timestamp DEFAULT NULL,
                       CONSTRAINT loan_customer_ibfk_1 FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE CASCADE
);

CREATE TABLE cards (
                       card_id serial PRIMARY KEY,
                       card_number varchar(100) NOT NULL,
                       customer_id int NOT NULL,
                       card_type varchar(100) NOT NULL,
                       total_limit int NOT NULL,
                       amount_used int NOT NULL,
                       available_amount int NOT NULL,
                       create_dt timestamp DEFAULT NULL,
                       CONSTRAINT card_customer_ibfk_1 FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE CASCADE
);


CREATE TABLE notice_details (
                                notice_id serial PRIMARY KEY,
                                notice_summary varchar(200) NOT NULL,
                                notice_details varchar(500) NOT NULL,
                                notic_beg_dt timestamp NOT NULL,
                                notic_end_dt timestamp DEFAULT NULL,
                                create_dt timestamp DEFAULT NULL,
                                update_dt timestamp DEFAULT NULL
);


CREATE TABLE contact_messages (
                                  contact_id varchar(50) NOT NULL,
                                  contact_name varchar(50) NOT NULL,
                                  contact_email varchar(100) NOT NULL,
                                  subject varchar(500) NOT NULL,
                                  message varchar(2000) NOT NULL,
                                  create_dt timestamp DEFAULT NULL,
                                  PRIMARY KEY (contact_id)
);

CREATE TABLE authorities (
                             id serial PRIMARY KEY,
                             customer_id int NOT NULL,
                             name varchar(50) NOT NULL,
                             CONSTRAINT authorities_ibfk_1 FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
);



