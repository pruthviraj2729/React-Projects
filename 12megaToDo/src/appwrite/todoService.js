import { Client, ID, Databases } from "appwrite";
import conf from '../conf/conf.js';

export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);  
  }

  async addTodo(todoData) {
    try {
      console.log('Creating todo with data:', todoData);
      
      // Only include the content field
      const todoToCreate = {
        content: todoData.content || ''
      };
      
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        todoToCreate
      );
      
      console.log('Todo created successfully:', response);
      return response;
    } catch (error) {
      console.error('Error in addTodo:', error);
      throw error;
    }
  }

  async getTodos() {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId
    );
  }

  async updateTodo(documentID, updatedData) {
    try {
      // Only include the content field in updates
      const updateData = {
        content: updatedData.content || ''
      };
      
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentID,
        updateData
      );
    } catch (error) {
      console.error('Error in updateTodo:', error);
      throw error;
    }
  }

  async deleteTodo(documentID) {
    return await this.databases.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      documentID
    );
  }
}

const service = new Service();
export default service;


// import { Client, ID, Databases} from "appwrite";
// import conf from '../conf/conf.js';

// export class Service{
//     client = new Client();
//     databases;
    


//     constructor() {
//         this.client
//         .setEndpoint(conf.appwriteUrl)
//         .setProject(conf.appwritProjectId);
//         this.databases = new Database(this.client)
//     }

//     async addTodo(todoData) {
//         return await databases.createDocument(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             ID.unique(),
//             todoData
//         );
//     };

//     async getTodos() {
//         return await databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId);
//     };

//     async updateTodo(documentID, updatedData) {
//         return await databases.updateDocument(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             documentID,
//             updatedData
//         );
//     };

//     async deleteTodo(documentID) {
//         return await databases.deleteDocument(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             documentID
//         );
//     };
// }

// const service = new Service()
// export default service