INSERT INTO department (department_name)
VALUE
    ('General Practice'),
    ('Ward'),
    ('Front Desk'),
    ('Maintenance');

INSERT INTO roles (title, salary, department_id)
VALUE 
    ('Doctor', 100000.00, 1),
    ('Nurse', 80000.00,2),
    ('Assistant', 30000.00, 3),
    ('Janitor', 60000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Zeke', 'Clear', 1, NULL),
  ('Quentin', 'Chump', 1, NULL),
  ('Thomasina', 'Curious', 1, NULL),
  ('Angela', 'Roadkill', 1, NULL),
  ('Violet', 'Brown', 1, 3),
  ('Ronald', 'Massive', 1,4),
  ('Eva', 'Dross',1,2),
  ('Naomi', 'Dangle', 1, NULL),
  ('Logan', 'Cress', 2, NULL),
  ('Trevor', 'Belcher', 2, NULL),
  ('Adam', 'Bap', 2, NULL),
  ('Edward', 'Sandwich', 2, NULL),
  ('Ernie', 'Factory', 2, NULL),
  ('Fay', 'Sovereign', 3, NULL),
  ('Amy', 'Beetroot', 4, NULL),
  ('Lauren', 'Turbo', 4, NULL);
