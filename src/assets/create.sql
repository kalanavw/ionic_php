-- auto-generated definition
CREATE TABLE IF NOT EXISTS vehicle
(
    id   int(11) unsigned auto_increment
        primary key,
    Name varchar(30) default '' not null
)
    charset = utf8;


-- auto-generated definition
CREATE TABLE IF NOT EXISTS address
(
    id            int(11) unsigned auto_increment
        primary key,
    CompanyName   varchar(30) null,
    ContactPerson varchar(30) null,
    Street        varchar(30) null,
    Number        varchar(10) null,
    ZipCode       int(7) null,
    City          varchar(30) null,
    Country       varchar(15) null,
    Phone         varchar(20) null,
    Email         varchar(25) null,
    Website       varchar(25) null
) charset = utf8;
-- auto-generated definition
CREATE TABLE IF NOT EXISTS itemlist
(
    id   int(11) unsigned auto_increment
        primary key,
    Text int(30) not null
) charset = utf8;

-- auto-generated definition
CREATE TABLE IF NOT EXISTS messages
(
    id             int(11) unsigned auto_increment
        primary key,
    SenderUserID   int                                      not null,
    ReceiverUserID int                                      not null,
    Text           varchar(300) default ''                  not null,
    TimeStamp      timestamp    default (CURRENT_TIMESTAMP) not null on update CURRENT_TIMESTAMP
) charset = utf8;

-- auto-generated definition
CREATE TABLE IF NOT EXISTS user
(
    id                  int(11) unsigned auto_increment
        primary key,
    FirstName           varchar(20) null,
    LastName            varchar(20) null,
    StatusID            int null,
    LastOnlineTimeStamp timestamp null,
    LastSyncTimeStamp   timestamp null,
    DeviceID            int null,
    VehicleID           int null,
    PasswordMD5         varchar(32) null
) charset = utf8;

-- auto-generated definition
CREATE TABLE IF NOT EXISTS status
(
    id   int(11) unsigned auto_increment
        primary key,
    Text varchar(30) default '' not null
) charset = utf8;

-- auto-generated definition
CREATE TABLE IF NOT EXISTS job
(
    id                     int(11) unsigned auto_increment primary key,
    AddressID              int                                   not null,
    UserID                 int                                   not null,
    PlanedDateTimeStart    timestamp default (CURRENT_TIMESTAMP) not null on update CURRENT_TIMESTAMP,
    PlanedDurationMinutes  int(5) null,
    PerformedDateTimeStart timestamp null,
    PerformedDateTimeEnd   timestamp null,
    Status                 int(2) not null,
    Details                varchar(100) null,
    Note                   varchar(100) null,
    NoteIntern             varchar(100) null,
    Price                  decimal(9, 2) null,
    Currency               varchar(10) null,
    Signature              int(1) null,
    PhotoCount             int(3) null
) charset = utf8;

