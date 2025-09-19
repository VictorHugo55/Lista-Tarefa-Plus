// hooks/useTasks.ts
import { useState, useEffect } from "react";
import {
  db,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "./firebaseConfig";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const tasksCollection = collection(db, "tasks");

  // 🔹 Buscar tarefas
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(tasksCollection);
      const data = snapshot.docs.map(
        (d) =>
          ({
            id: d.id,
            ...d.data(),
          } as Task)
      );
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Criar
  const createTask = async (task: Omit<Task, "id">) => {
    try {
      const docRef = await addDoc(tasksCollection, task);
      setTasks((prev) => [...prev, { ...task, id: docRef.id }]);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  // 🔹 Atualizar
  const updateTask = async (id: string, task: Partial<Task>) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, task);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...task } : t))
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  // 🔹 Deletar
  const deleteTask = async (id: string) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await deleteDoc(taskRef);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    fetchTasks,
  };
}
