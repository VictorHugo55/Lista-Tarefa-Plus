import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTasks, Task } from "../src/services/useTasks";

// Tipagem dos parâmetros de rota (task passada como JSON)
type TaskFormParams = {
  task?: string;
};

export default function TasksFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<TaskFormParams>();

  const { createTask, updateTask } = useTasks();

  // Desserializa task se existir (edição)
  const taskToEdit: Task | undefined = params.task ? JSON.parse(params.task) : undefined;

  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || "");
  const [completed, setCompleted] = useState(taskToEdit?.completed || false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Erro", "O título da tarefa é obrigatório!");
      return;
    }

    const taskData: Omit<Task, "id"> = {
      title,
      description: description || "",
      dueDate: dueDate || "",
      completed,
    };

    try {
      if (taskToEdit?.id) {
        await updateTask(taskToEdit.id, taskData);
      } else {
        await createTask(taskData);
      }
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao salvar a tarefa.");
      console.log("Erro ao salvar task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título"
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Digite a descrição"
      />

      <Text style={styles.label}>Prazo:</Text>
      <TextInput
        style={styles.input}
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="AAAA-MM-DD"
      />

      <View style={styles.switchContainer}>
        <Text>Concluída:</Text>
        <Switch value={completed} onValueChange={setCompleted} />
      </View>

        <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
                {taskToEdit ? "Atualizar Tarefa" : "Adicionar Tarefa"}
            </Text>
        </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  label: { marginTop: 12, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginTop: 4, borderRadius: 4 },
  switchContainer: { flexDirection: "row", alignItems: "center", marginVertical: 12 },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
