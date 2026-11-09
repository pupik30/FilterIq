// Создание готовой БД для фильтрации


import { DatabaseSync } from 'node:sqlite';
import { join } from 'node:path';

const db = new DatabaseSync(join(import.meta.dirname, 'students.db'));

db.exec(`
  drop table if exists students;

  create table students(
    id integer primary key autoincrement,
    name text not null,
    iq integer not null
  );
`);

const insert = db.prepare('insert into students (name, iq) values (?, ?)');

const rows = [
  ['Анастасия Шпомер', 67],
  ['Виолетта Бондаренко', 142],
  ['Роман Ровда', 89],
  ['Андрей Дубинин', 181],
  ['Алина Парута', 74],
  ['Анастасия Смирнова', 118],
  ['Никита Нестеренко', 73],
  ['Ксения Карчевская', 41],
  ['Борис Ищенко', 131],
  ['Светлана Коровкина', 96],
  ['Настя Богданова', 58],
  ['Артем Тесов', 141],
  ['Владимир Судаков', 74],
  ['Валерий Лянг', 73],
  ['Александр Пахомов', 41],
  ['Роман Марковин', 131],
  ['Михаил Старчуков', 96],
  ['Данила Дмитриевич Парамонов', 124],
  ['Константин Ковалевский', 58],
  ['Роман Живетин', 67],
  ['Надежда Жарикова', 142],
  ['Александр Стренин', 89],
  ['Сергей Перевозников', 11],
  ['Виктория Пономарева', 74],
  ['Татьяна Колесникова', 118],
  ['Анастасия Евсеева', 73],
  ['Арнеста Мисюнайте', 41]
];

for (const [name, iq] of rows) insert.run(name, iq);

console.log('Строк в базе:', db.prepare('select count(*) as n from students').get().n);
db.close();