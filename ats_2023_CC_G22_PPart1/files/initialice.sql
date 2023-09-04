CREATE TABLE IF NOT EXISTS WebAppRequests (
    WebServer VARCHAR(50),
    Datetime TIMESTAMP DEFAULT Now(),
    PRIMARY KEY(WebServer, DateTime)
);