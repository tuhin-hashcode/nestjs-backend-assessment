INSERT INTO player (name, email, activation_status, display_id) VALUES
('Alice', 'alice@example.com', true, 'P001'),
('Bob', 'bob@example.com', true, 'P002'),
('Charlie', 'charlie@example.com', false, 'P003'),
('David', 'david@example.com', true, 'P004'),
('Eve', 'eve@example.com', false, 'P005');

INSERT INTO player_session (session_id, websocket_client_id, is_online, player_id) VALUES
('S001', 'WS001', true, 1),
('S002', 'WS002', false, 1),
('S003', 'WS003', true, 2),
('S004', 'WS004', false, 3),
('S005', 'WS005', true, 3),
('S006', 'WS006', true, 4),
('S007', 'WS007', false, 5);
