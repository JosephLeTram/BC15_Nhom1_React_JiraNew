import { all } from "redux-saga/effects";
import * as SignInSaga from "./SignInSaga";
import * as ProjectCategorySaga from "./ProjectCategorySaga";
import * as CreateProjectSaga from "./CreateProjectSaga";
import * as ProjectListSaga from "./ProjectListSaga";
import * as ProjectUpdateSaga from "./ProjectUpdateSaga";
import * as ProjectDeleteSaga from "./ProjectDeleteSaga";
import * as SearchUserSaga from "./SearchUserSaga";
import * as SearchUserByProjectIdSaga from "./SearchUserByProjectIdSaga";
import * as AssignUserToProjectSaga from "./AssignUserToProjectSaga";
import * as RemoveUserFromProjectSaga from "./RemoveUserFromProjectSaga";
import * as ProjectDetailSaga from "./ProjectDetailSaga";
import * as TaskTypeSaga from "./TaskTypeSaga";
import * as PriorityTypeSaga from "./PriorityTypeSaga";
import * as CreateTaskSaga from "./CreateTaskSaga";
import * as StatusTypeSaga from "./StatusTypeSaga";
import * as TaskDetailSaga from "./TaskDetailSaga";
import * as TaskUpdateSaga from "./TaskUpdateSaga";
import * as TaskStatusUpdateSaga from "./TaskStatusUpdateSaga";
import * as CommentListSaga from "./CommentListSaga";
import * as CommenInsertSaga from "./CommentInsertSaga";
import * as CommentDeleteSaga from "./CommentDeleteSaga";
import * as CommentUpdateSaga from "./CommentUpdateSaga";

export function* rootSaga() {
  yield all([
    SignInSaga.followSignin(),
    ProjectCategorySaga.followGetAllProjectCategory(),
    CreateProjectSaga.followCreateProjectSaga(),
    ProjectListSaga.followGetProjectListSaga(),
    ProjectUpdateSaga.followUpdateProjectSaga(),
    ProjectDeleteSaga.followDeleteProjectSaga(),
    SearchUserSaga.followSearchUserSaga(),
    SearchUserByProjectIdSaga.followSearchUserByProjectIdSaga(),
    AssignUserToProjectSaga.followAssignUserToProjectSaga(),
    RemoveUserFromProjectSaga.followRemoveUserFromProjectSaga(),
    ProjectDetailSaga.followGetProjectDetailSaga(),
    TaskTypeSaga.followGetAllTaskType(),
    PriorityTypeSaga.followGetAllPriorityType(),
    CreateTaskSaga.followCreateTaskSaga(),
    StatusTypeSaga.followGetAllStatusType(),
    TaskDetailSaga.followGetTaskDetailSaga(),
    TaskUpdateSaga.followHandleChangePostApi(),
    TaskStatusUpdateSaga.followUpdateTaskStatus(),
    CommentListSaga.followGetCommentListSaga(),
    CommenInsertSaga.followInsertCommentListSaga(),
    CommentDeleteSaga.followDeleteCommentSaga(),
    CommentUpdateSaga.followUpdateComment(),
  ]);
}
