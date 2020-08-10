const Database = require('./db') //inportando o banco de dados para esse arquivo
const createProffy = require('./createProffy')

Database.then(async (db) => {
     //Inserir dados

    proffyValue = {
        name: 'Lucas Brito',
        avatar: 'https://avatars1.githubusercontent.com/u/31296430?s=460&u=f19e946ae2311d9b920ed4aab97021c25c33a3d0&v=4',
        whatsapp: '664565456',
        bio: "Ninja"
    }

    classValue = {
        subject: 1,
        cost: "100"   
    }

    classScheduleValues = [
        {
            weekday: 4,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]
      
      await createProffy(db, {proffyValue, classValue, classScheduleValues})

     //Consultar os dados inseridos

     //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //   console.log(selectedProffys)

     //consultar as classes de um determinado professor
     //e trazer junto os dados do professor
     const selectClassesAndProffys = await db.all(`
          SELECT classes.*,proffys.*
         FROM proffys
          JOIN classes ON (classes.proffy_id = proffys.id)
         WHERE classes.proffy_id = 1;
      `)
// console.log(selectClassesAndProffys)

     // o horario que a pessoa trabalha, por exemplo, e das 8h - 18h
     // o horario do time_from (8h) precisa ser antes e igual ao horario solicitado
     // o time_to precisa ser acima
     const selectClassesSchedules = await db.all(`
         SELECT class_schedule.*
         FROM class_schedule 
         WHERE class_schedule.class_id = 1
         AND class_schedule.weekday = "0"
         AND class_schedule.time_from <= "520"
         AND class_schedule.time_to > "520"

     `)
     
})