"use client";

import { ConfirmModal, TextFieldInput } from "@/components";
import TextFiledInput from "@/components/text-field-input/TextFiledInput";
import { useTodoContext } from "@/context";
import { TItemsTodo } from "@/context/TodoContext.type";
import useToastNotification from "@/hooks/useToastNotification";
import FormProvider from "@/provider/FormProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Chip,
  Grid,
  Grow,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useTheme
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GrEdit } from "react-icons/gr";
import { PiPaperclipFill } from "react-icons/pi";
import { TbTrashX, TbUserSquareRounded } from "react-icons/tb";
import DatePicker, { type DateObject } from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import { z, type ZodType } from "zod";

const startValidation: z.infer<ZodType> = z.object({
  author: z
    .string({ message: "please enter your name" })
    .min(4, { message: "It must be at least 4 letters" })
    .max(15, { message: "It should be 15 characters at most" })
});

const todoValidation: z.infer<ZodType> = z.object({
  title: z
    .string({ message: "Please enter your title todo" })
    .min(6, { message: "It must be at least 6 letters" })
    .max(20, { message: "It should be 20 characters at most" })
});

function HomePage() {
  const {
    AddTodos,
    DeleteTodos,
    UpdaterTodos,
    itemsTodo,
    doneTodosData,
    notDoneTodosData,
    EditTodos
  } = useTodoContext();

  const { successToast, errorToast } = useToastNotification(2500, "bottom-center");
  const { palette } = useTheme();

  const [SlideTransition, setSlideTrasition] = useState<boolean>(false);
  const [todoDate, setTodoDate] = useState<DateObject | null>(null);
  const [openConfirmUpdate, setOpenConfirmUpdate] = useState<boolean>(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false);
  const [openEditConfirm, setOpenEditConfirm] = useState<boolean>(false);
  const [idByUpdate, setIdByUpdate] = useState<string>("");
  const [idByDelete, setIdByDelete] = useState<string>("");
  const [EditData, setEditData] = useState<TItemsTodo>();
  const [tabValue, setTabValue] = useState<"all" | "done" | "notDone">("all");

  const startMethods = useForm({
    resolver: zodResolver(startValidation),
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
      author: ""
    }
  });

  const todoMethods = useForm({
    resolver: zodResolver(todoValidation),
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
      title: ""
    }
  });

  const editMethods = useForm({
    resolver: zodResolver(todoValidation),
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
      title: ""
    }
  });

  const bgColorTabs = {
    all: palette.todoColor.base,
    done: palette.todoColor.done,
    notDone: palette.todoColor.notDone
  };

  const filtredTodoData = {
    all: itemsTodo,
    done: doneTodosData,
    notDone: notDoneTodosData
  };

  const SubmitStartHandler = () => {
    setSlideTrasition(true);
    successToast("Welcome to Todo List :)");
  };

  const updateTodoHandle = () => {
    UpdaterTodos(idByUpdate);
    setOpenConfirmUpdate(false);
    successToast("Update Todo SuccessFully");
  };

  const deleteTodoHandle = () => {
    DeleteTodos(idByDelete);
    setOpenDeleteConfirm(false);
    successToast("Delete Todo SuccessFully");
  };

  const SumbitEditHandle = () => {
    EditTodos(EditData?.id ?? "", editMethods.getValues("title"), startMethods.getValues("author"));
    successToast("Edit Todo SuccessFully");
    setOpenEditConfirm(false);
  };

  const SubmitTodoHandler = (data: { title: string }) => {
    const newTodo = {
      id: crypto.randomUUID(),
      completed: false,
      date: `${todoDate?.year}/${todoDate?.month}/${todoDate?.day}`,
      title: data.title,
      author: startMethods.getValues("author")
    };
    if (!todoDate?.year || !todoDate?.month || !todoDate?.day) {
      errorToast("please select a date ...");
      return;
    } else {
      AddTodos(newTodo);
      successToast("Todo Add ... : )");
      todoMethods.reset({ title: "" });
      setTodoDate(null);
    }
  };

  return !SlideTransition ? (
    <Box mx="25px" mt="25px">
      <Box display="flex" alignItems="center" gap="10px" justifyContent="center">
        <Typography variant="h2" color={palette.todoColor.base}>
          Todo
        </Typography>
        <Typography variant="h2" color={palette.todoColor.primary}>
          List ...
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" mt="25px">
        <Typography variant="h5" color={palette.todoColor.secondary}>
          before start todo list enter your name :)
        </Typography>
      </Box>
      <Box mt="25px">
        <FormProvider
          methods={startMethods}
          onSubmit={startMethods.handleSubmit(SubmitStartHandler)}
        >
          <Grid>
            <TextFiledInput
              name="author"
              titleInput="author"
              addortmentItems={
                <TbUserSquareRounded color={palette.todoColor.primary} size="1.5rem" />
              }
            />
          </Grid>
          <Grid mt="25px">
            <Button fullWidth type="submit" variant="secondary">
              Lets Start ...
            </Button>
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  ) : (
    <>
      <Grow in={SlideTransition}>
        <Box mx="25px">
          <Box display="flex" alignItems="center" gap="10px" justifyContent="center">
            <Typography variant="h2" color={palette.todoColor.base}>
              My
            </Typography>
            <Typography variant="h2" color={palette.todoColor.primary}>
              Todo List
            </Typography>
          </Box>
          <Box mt="25px" display="flex" alignItems="center" justifyContent="center">
            <Typography color={palette.todoColor.secondary}>Add Todo List ...</Typography>
          </Box>
          <Box>
            <FormProvider
              methods={todoMethods}
              onSubmit={todoMethods.handleSubmit(SubmitTodoHandler)}
            >
              <Box>
                <Box>
                  <TextFiledInput
                    name="title"
                    titleInput="title"
                    addortmentItems={
                      <PiPaperclipFill color={palette.todoColor.primary} size="1.5rem" />
                    }
                  />
                </Box>
                <Box display="flex" alignItems="center" gap="25px" mt="15px">
                  <DatePicker
                    render={<Icon color={palette.todoColor.primary} />}
                    value={todoDate}
                    onChange={setTodoDate}
                  />
                  <Box display="flex" alignItems="center" gap="25px">
                    <Typography>todo Date : </Typography>
                    <Typography>
                      {!todoDate
                        ? "yyyy/mm/dd"
                        : `${todoDate.year}/${todoDate.month}/${todoDate.day}`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Grid mt="25px">
                <Button fullWidth type="submit" variant="secondary">
                  Add Todo :)
                </Button>
              </Grid>
            </FormProvider>
          </Box>
          {itemsTodo.length === 0 ? (
            <Box mt="25px" display="flex" alignItems="center" justifyContent="center">
              <Typography color={palette.todoColor.secondary} variant="h4">
                Not Found Todo ...
              </Typography>
            </Box>
          ) : (
            <Box py="25px">
              <Box display="flex" alignItems="center" justifyContent="center" my="25px">
                <Tabs
                  value={tabValue}
                  onChange={(event, newValue) => setTabValue(newValue)}
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: bgColorTabs[tabValue],
                      height: "100%",
                      borderRadius: "15px",
                      zIndex: 1
                    },
                    "& .Mui-selected": {
                      color: "#FFFFFF !important",
                      zIndex: 100
                    }
                  }}
                >
                  <Tab value="all" label="All" disableRipple />
                  <Tab value="done" label="Done" disableRipple />
                  <Tab value="notDone" label="NotDone" disableRipple />
                </Tabs>
              </Box>
              <Box display="flex" flexDirection="column" gap="15px">
                {filtredTodoData[tabValue]?.map((todoItems) => (
                  <Box
                    key={todoItems.id}
                    display="flex"
                    flexDirection="column"
                    gap="15px"
                    padding="8px"
                    sx={{
                      borderRadius: "15px",
                      border: "2px solid",
                      borderColor:
                        todoItems.completed === true
                          ? palette.todoColor.done
                          : palette.todoColor.notDone,
                      "& .MuiTypography-root": {
                        color:
                          todoItems.completed === true
                            ? palette.todoColor.done
                            : palette.todoColor.notDone,
                        fontWeight: "bold"
                      }
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography>title : {todoItems.title}</Typography>
                      <Typography>author : {todoItems.author}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography>date : {todoItems.date}</Typography>
                      <Chip
                        label={todoItems.completed === true ? "done" : "not done"}
                        variant={todoItems.completed === true ? "done" : "notDone"}
                      />
                    </Box>
                    <Box>
                      <IconButton
                        onClick={() => {
                          setOpenDeleteConfirm(true);
                          setIdByDelete(todoItems.id);
                        }}
                      >
                        <TbTrashX size="1.5rem" color="red" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setEditData(todoItems);
                          setOpenEditConfirm(true);
                          editMethods.reset({ title: todoItems.title });
                        }}
                      >
                        <GrEdit size="1.25rem" color={palette.todoColor.base} />
                      </IconButton>
                      <Button
                        disabled={todoItems.completed}
                        variant="error"
                        onClick={() => {
                          setIdByUpdate(todoItems.id);
                          setOpenConfirmUpdate(true);
                        }}
                      >
                        Done
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          <ConfirmModal
            open={openConfirmUpdate}
            onClose={() => setOpenConfirmUpdate(false)}
            title="update todo ..."
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="20px"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4">Are You Sure ??</Typography>
              <Box display="flex" gap="15px">
                <Button fullWidth variant="error" onClick={updateTodoHandle}>
                  Ok!
                </Button>
                <Button fullWidth variant="secondary" onClick={() => setOpenConfirmUpdate(false)}>
                  Cancle
                </Button>
              </Box>
            </Box>
          </ConfirmModal>
          <ConfirmModal
            open={openDeleteConfirm}
            onClose={() => setOpenDeleteConfirm(false)}
            title="delele todo.."
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="20px"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4">Are You Sure ??</Typography>
              <Box display="flex" gap="15px">
                <Button fullWidth variant="error" onClick={deleteTodoHandle}>
                  Delete!
                </Button>
                <Button fullWidth variant="secondary" onClick={() => setOpenDeleteConfirm(false)}>
                  Cancle
                </Button>
              </Box>
            </Box>
          </ConfirmModal>
          <ConfirmModal
            open={openEditConfirm}
            onClose={() => setOpenEditConfirm(false)}
            title="edit todo ..."
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap="15px"
            >
              <Typography fontSize="16px">Edit Todo : {EditData?.title}</Typography>
              <FormProvider
                methods={editMethods}
                onSubmit={editMethods.handleSubmit(SumbitEditHandle)}
              >
                <Box>
                  <TextFieldInput name="title" titleInput="title(before)" addortmentItems="" />
                </Box>
                <Box mt="15px">
                  <Button type="submit" fullWidth variant="secondary">
                    Edit Todo ...
                  </Button>
                </Box>
              </FormProvider>
            </Box>
          </ConfirmModal>
        </Box>
      </Grow>
    </>
  );
}

export default HomePage;
