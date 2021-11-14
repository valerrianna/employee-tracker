INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Zeke', 'Clear', 1, NULL),
  ('Quentin', 'Chump', 1, NULL),
  ('Thomasina', 'Curious', 1, NULL),
  ('Angela', 'Roadkill', 1, NULL),
  ('Violet', 'Brown', 1, 3),
  ('Esther', 'Peril', 1, NULL),
  ('Ronald', 'Massive', 1,4),
  ('Eva', 'Dross',1,2),
  ('Naomi', 'Dangle', 1, NULL),
  ('Logan', 'Cress', 2, NULL),
  ('Trevor', 'Belcher', 2, NULL),
  ('Bert', 'Clubb', 2,10),
  ('Dominic', 'Strudel', 2,10),
  ('Adam', 'Bap', 2, NULL),
  ('Edward', 'Sandwich', 2, NULL),
  ('Ernie', 'Factory', 2, NULL),
  ('Raphel', 'Clubb', 2,10),
  ('Reginald', 'Gunge', 2, 10),
  ('Fay', 'Sovereign', 3, NULL),
  ('Dominic', 'Lane', 3, 19),
  ('Beryl', 'Rhymes', 3, 19),
  ('Annika', 'Larder', 3, 19),
  ('Hester', 'Hunt',3,19),
  ('Bernie', 'Mastic', 3, 19),
  ('Barbara', 'Fopp', 3,19),
  ('Sebastian', 'Hurt', 3, 19),
  ('Amy', 'Beetroot', 4, NULL),
  ('Suze', 'Eames', 4, NULL),
  ('Steve', 'Hancock', 4, NULL),
  ('Madeline', 'Fromage', 4, NULL),
  ('Lauren', 'Turbo', 4, NULL);

INSERT INTO roles (title, salary, department_id)
VALUE 
    ('Doctor', 100000.00),
    ('Nurse', 80000.00),
    ('Assistant', 30000.00),
    ('Janitor', 60000.00);

INSERT INTO department (department_name)
VALUE
    ('General Practice'),
    ('Psychiatry')
    ('Ward')
    ('Diagnostics')
    ('Surgery')