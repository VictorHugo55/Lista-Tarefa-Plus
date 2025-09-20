import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTasks, Task } from "../src/services/useTasks";
import { useTheme } from "../src/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

// Tipagem dos parâmetros de rota (task passada como JSON)
type TaskFormParams = {
  task?: string;
};

export default function TasksFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<TaskFormParams>();
  const {colors} = useTheme();

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
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.label, {color:colors.text}]}>Título:</Text>
      <TextInput
        style={[styles.input, {backgroundColor:colors.input,color:colors.inputText}]}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={colors.inputText}
        placeholder="Digite o título"
      />

      <Text style={[styles.label, {color:colors.text}]}>Descrição:</Text>
      <TextInput
        style={[styles.input, {backgroundColor:colors.input,color:colors.inputText}]}
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={colors.inputText}
        placeholder="Digite a descrição"
      />

      <Text style={[styles.label, {color:colors.text}]}>Prazo:</Text>
      <TextInput
        style={[styles.input, {backgroundColor:colors.input,color:colors.inputText}]}
        value={dueDate}
        onChangeText={setDueDate}
        placeholderTextColor={colors.inputText}
        placeholder="AAAA-MM-DD"
      />

      <View style={styles.switchContainer}>
        <Text style={[styles.switchContainer,{color:colors.text}]}>Concluída:</Text>
        <Switch value={completed} onValueChange={setCompleted} />
      </View>

        <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
                {taskToEdit ? "Atualizar Tarefa" : "Adicionar Tarefa"}
            </Text>
        </Pressable>

    </SafeAreaView>
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
