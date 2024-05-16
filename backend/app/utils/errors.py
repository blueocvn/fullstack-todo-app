import enum
from typing import Any, Dict

from fastapi import HTTPException
from pydantic import BaseModel


class ErrorCodeEnum(str, enum.Enum):
    ERP_AUTH_INVALID_CREDENTIALS = "ERP_AUTHEN_INVALID_CREDENTIALS"
    ERP_AUTH_INSUFFICIENT_PERMISSIONS = "ERP_AUTH_INSUFFICIENT_PERMISSIONS"

    ERP_SESSION_INVALID_FORMAT = "ERP_SESSION_INVALID_FORMAT"
    ERP_SESSION_NOT_FOUND = "ERP_SESSION_NOT_FOUND"
    ERP_SESSION_ALREADY_EXISTS = "ERP_SESSION_ALREADY_EXISTS"
    ERP_SESSION_INVALID_TIME_PERIOD = "ERP_SESSION_INVALID_TIME_PERIOD"

    # Attachment error
    ERP_ATTACHMENT_NOT_FOUND = "ERP_ATTACHMENT_NOT_FOUND"
    ERP_ATTACHMENT_FILE_TYPE_NOT_ALLOWED = "ERP_ATTACHMENT_FILE_TYPE_NOT_ALLOWED"
    ERP_ATTACHMENT_TOO_LARGE = "ERP_ATTACHMENT_TOO_LARGE"
    # employee' error codes
    ERP_EMPLOYEE_NOT_REVIEWER = "ERP_EMPLOYEE_NOT_REVIEWER"
    # comments' error codes
    ERP_COMMENT_NOT_FOUND = "ERP_COMMENT_NOT_FOUND"
    ERP_COMMENT_PERMISSION_DENIED = "ERP_COMMENT_PERMISSION_DENIED"

    ERP_REVIEWER_INVALID_TIME_PERIOD = "ERP_REVIEWER_INVALID_TIME_PERIOD"
    ERP_EMPLOYEE_NOT_FOUND = "ERP_EMPLOYEE_NOT_FOUND"
    ERP_ROLE_NOT_FOUND = "ERP_ROLE_NOT_FOUND"

    ERP_GOAL_CREATE_ERROR = "ERP_GOAL_CREATE_ERROR"
    ERP_GOAL_INVALID_TIME_PERIOD_ERROR = "ERP_GOAL_INVALID_TIME_PERIOD_ERROR"
    ERP_GOAL_UPDATE_ERROR = "ERP_GOAL_UPDATE_ERROR"
    ERP_GOAL_DELETE_ERROR = "ERP_GOAL_DELETE_ERROR"
    ERP_GOAL_PERMISSION_DENIED = "ERP_GOAL_PERMISSION_DENIED"
    ERP_GOAL_NOT_FOUND = "ERP_GOAL_NOT_FOUND"
    ERP_GOAL_STATUS_NOT_FOUND = "ERP_GOAL_STATUS_NOT_FOUND"
    ERP_GOAL_INVALID_STATUS = "ERP_GOAL_INVALID_STATUS"
    ERP_GOAL_KEY_RESULT_NOT_FOUND = "ERP_GOAL_KEY_RESULT_NOT_FOUND"
    ERP_GOAL_KEY_RESULT_COMMENT_NOT_FOUND = "ERP_GOAL_KEY_RESULT_COMMENT_NOT_FOUND"
    ERP_GOAL_TOO_FEW_KEY_RESULT = "ERP_GOAL_TOO_FEW_KEY_RESULT"
    ERP_GOAL_TOO_MANY_KEY_RESULT = "ERP_GOAL_TOO_MANY_KEY_RESULT"
    ERP_GOAL_INVALID_DUE_DATE = "ERP_GOAL_INVALID_DUE_DATE"
    ERP_GOAL_INVALID_SUBMISSION = "ERP_GOAL_INVALID_SUBMISSION"
    ERP_GOAL_COMMENT_NOT_FOUND = "ERP_GOAL_COMMENT_NOT_FOUND"
    ERP_PARENT_GOAL_COMMENT_NOT_FOUND = "ERP_PARENT_GOAL_COMMENT_NOT_FOUND"
    ERP_GOAL_COMMENT_PERMISSION_DENIED = "ERP_GOAL_COMMENT_PERMISSION_DENIED"
    ERP_GOAL_EVALUATION_NOT_FOUND = "ERP_GOAL_EVALUATION_NOT_FOUND"
    ERP_GOAL_EVALUATION_PERMISSION_DENIED = "ERP_GOAL_EVALUATION_PERMISSION_DENIED"
    ERP_GOAL_PARENT_NOT_IN_SAME_SESSION = "ERP_GOAL_PARENT_NOT_IN_SAME_SESSION"

    # input's error code
    ERP_INPUT_PERMISSION_DENIED = "ERP_INPUT_PERMISSION_DENIED"
    ERP_INPUT_NOT_FOUND = "ERP_INPUT_NOT_FOUND"
    ERP_INPUT_INVALID_STATE = "ERP_INPUT_INVALID_STATE"
    ERP_INPUT_INVALID_VISIBILITY_CHANGE = "ERP_INPUT_INVALID_VISIBILITY_CHANGE"
    ERP_INPUT_TOO_MANY_SUBMISSION = "ERP_INPUT_TOO_MANY_SUBMISSION"
    ERP_INPUT_INVALID_TIME_PERIOD = "ERP_INPUT_INVALID_TIME_PERIOD"
    ERP_INPUT_INVALID_STATUS_CHANGE = "ERP_INPUT_INVALID_STATUS_CHANGE"
    ERP_INPUT_INVALID_ANONYMOUS_STATE = "ERP_INPUT_INVALID_ANONYMOUS_STATE"
    ERP_INPUT_COMMENT_PERMISSION_DENIED = "ERP_INPUT_COMMENT_PERMISSION_DENIED"
    ERP_INPUT_TAG_ERROR = "ERP_INPUT_TAG_ERROR"
    ERP_INPUT_TAG_PERMISSION_DENIED = "ERP_INPUT_TAG_PERMISSION_DENIED"

    # import/export errors
    ERP_CAN_NOT_OPEN_THE_FILE = "ERP_CAN_NOT_OPEN_THE_FILE"
    ERP_INVALID_FILE_FORMAT = "ERP_INVALID_FILE_FORMAT"

    # goal key result progress
    ERP_GOAL_KEY_RESULT_PROGRESS_NOT_FOUND = "ERP_GOAL_KEY_RESULT_PROGRESS_NOT_FOUND"
    ERP_GOAL_KEY_RESULT_PROGRESS_COMMENT_NOT_FOUND = (
        "ERP_GOAL_KEY_RESULT_PROGRESS_COMMENT_NOT_FOUND"
    )

    # Notification
    ERP_WATCHER_NOT_FOUND = "ERP_WATCHER_NOT_FOUND"

    # Employee create and auth error
    ERP_BADGE_NUMBER_ALREADY_EXIST = "ERP_BADGE_NUMBER_ALREADY_EXIST"
    ERP_EMAIL_ALREADY_EXIST = "ERP_EMAIL_ALREADY_EXIST"
    ERP_INVALID_EMAIL = "ERP_INVALID_EMAIL"
    ERP_INVALID_PASSWORD = "ERP_INVALID_PASSWORD"
    ERP_INCORRECT_PASSWORD = "ERP_INCORRECT_PASSWORD"


class ErrorCode(BaseModel):
    code: ErrorCodeEnum
    message: str | None = None
    extras: Dict[str, Any] | None = None


class APIException(HTTPException):
    def __init__(
        self,
        status_code: int,
        detail: ErrorCode,
        extras: Dict[str, Any] | None = None,
        headers: Dict[str, str] | None = None,
    ):
        if not APIException.is_defined_error(detail):
            raise ValueError(
                f"Error code {detail.code} is not defined in ErrorCodes class"
            )
        message = detail.message
        if extras:
            message = message.format_map(extras)  # type: ignore

        response = ErrorCode(code=detail.code, message=message, extras=extras)

        super().__init__(
            status_code=status_code,
            detail=response.model_dump(exclude_none=True),
            headers=headers,
        )

    @staticmethod
    def is_defined_error(error: ErrorCode) -> bool:
        attrs = dir(ErrorCodes)
        for attr_name in attrs:
            attr = getattr(ErrorCodes, attr_name)
            if isinstance(attr, ErrorCode) and attr.code == error.code:
                return True

        return False


class ErrorCodes:

    APP_USER_ALREADY_EXIT = ErrorCode(
        code=ErrorCodeEnum.ERP_INCORRECT_PASSWORD,
        message="User already exit",
    )

    APP_WRONG_USERNAME_OR_PASSWORD = ErrorCode(
        code=ErrorCodeEnum.ERP_INCORRECT_PASSWORD,
        message="Wrong user name or password",
    )
