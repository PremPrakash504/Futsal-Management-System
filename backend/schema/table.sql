CREATE TABLE super_admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    number VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL
);


CREATE TABLE vendors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    number VARCHAR(20),
    package_type ENUM('normal','medium','hight') DEFAULT 'normal',

    FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    member_id INT,
    start_time TIME,
    end_time TIME,
    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (member_id) REFERENCES members(id)
);