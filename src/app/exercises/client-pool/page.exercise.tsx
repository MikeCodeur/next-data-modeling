// 🐶 Importe le Type 'Todo' il nous sera utile pour typer les données recus
// import {Todo} from '@/lib/type'

// 🐶 Importe la classe 'Client' elle nous permettra d'instancier un client postgres
// import {Client} from 'pg'

async function getTodos() {
  // 🐶 Crée une instance de 'Client' avec les informations de connexion

  // Utilise 'connectionString' pour se connecter à la base de données
  // 'connectionString' est une chaine de caractère qui contient les informations de connexion
  // Forme : 'postgres://<user>:<password>@localhost:5432/<bdd_name>?sslmode=disable'
  // Exemple : 'postgres://postgres:admin@localhost:5432/postgres?sslmode=disable'
  // 📑 doc : https://node-postgres.com/apis/client

  // 🤖 const client = new Client({...

  // 🐶 Connecte toi à la base de données
  // 📑 doc : https://node-postgres.com/features/connecting#environment-variables

  // 🤖 await client.connect()

  // 🐶 Récupère les données de la table 'Todo' avec la requete SQL suivante
  // 🤖 `SELECT id, title, iscompleted AS "isCompleted",  createdat AS "createdAt",  updatedat AS "updatedAt" from Todo`

  // 🐶 pour executer cette requete :
  // 🤖 const {rows} = await client.query<Todo>(`SELECT ...`)

  const rows = [
    {
      id: 1,
      title: 'Fake Data',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
  // 🐶 Déconnecte toi de la base de données avec
  // 🤖 await client.end()
  return rows
}

export default async function Page() {
  const rows = await getTodos()
  return (
    <div className="mx-auto max-w-2xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Todo List</h1>
      {rows.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            id={todo.id.toString()}
            name={todo.title}
            defaultChecked={todo.isCompleted}
          ></input>
          <label htmlFor={todo.id.toString()}>{todo.title}</label>
        </div>
      ))}
    </div>
  )
}
