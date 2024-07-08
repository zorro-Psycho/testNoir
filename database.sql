CREATE DATABASE noirgamezone;

\\users
CREATE TABLE Users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\\games
CREATE TABLE Games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    release_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\\Achievments
CREATE TABLE Achievements (
    id SERIAL PRIMARY KEY,
    game_id INT REFERENCES Games(id),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    points INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\\NFTS
CREATE TABLE NFTs (
    id SERIAL PRIMARY KEY,
    owner_id UUID REFERENCES Users(user_id),
    game_id INT REFERENCES Games(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\\Transactions
CREATE TABLE Transactions (
    id SERIAL PRIMARY KEY,
    nft_id INT REFERENCES NFTs(id),
    buyer_id UUID REFERENCES Users(user_id),
    seller_id UUID REFERENCES Users(user_id),
    price DECIMAL(10, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\\Events
CREATE TABLE Events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\\userachievements
CREATE TABLE UserAchievements (
    user_id UUID REFERENCES Users(user_id),
    achievement_id INT REFERENCES Achievements(id),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, achievement_id)
);

\\userEvents
CREATE TABLE UserEvents (
    user_id UUID REFERENCES Users(user_id),
    event_id INT REFERENCES Events(id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, event_id)
);

\\Coummunities
CREATE TABLE Communities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\\user Coummunities
CREATE TABLE UserCommunities (
    user_id UUID REFERENCES Users(user_id),
    community_id INT REFERENCES Communities(id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, community_id)
);


\\Gamesession
CREATE TABLE GameSessions (
    id SERIAL PRIMARY KEY,
    game_id INT REFERENCES Games(id),
    user_id UUID REFERENCES Users(user_id),
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    score INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
