import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  FirestoreError,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Tipagem da task
export type Task = {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const tasksCollection = collection(db, "tasks");

  // Busca tasks em tempo real
  useEffect(() => {
    const q = query(tasksCollection, orderBy("dueDate", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: Task[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
        setTasks(list);
        setLoading(false);
      },
      (error: FirestoreError) => {
        console.error("Erro ao buscar tarefas:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Criar tarefa
  const createTask = async (task: Omit<Task, "id">) => {
    try {
      await addDoc(tasksCollection, task);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      console.log("Erro ao adicionar tarefa:", error);
    }
  };

  // Atualizar tarefa
  const updateTask = async (id: string, task: Partial<Task>) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, task);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  // Deletar tarefa
  const deleteTask = async (id: string) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return { tasks, loading, createTask, updateTask, deleteTask };
};
