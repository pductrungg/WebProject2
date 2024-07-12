﻿using HopTri.Share.Common.Enums;
using HopTri.Share.Common.Models;

namespace HopTri.Share.Common.Helpers;
public static class ApiResultHelper
{
    /// <summary>
    /// Builds the error API result model.
    /// </summary>
    /// <param name="messageContent">Content of the message</param>
    /// <param name="data">data</param>
    /// <returns></returns>
    public static AppApiResult BuildErrorApiResult(string messageContent, object data = null)
    {
        return new AppApiResult
        {
            IsSuccess = false,
            Data = data,
            Messages = new List<AppMessage>
                {
                    new AppMessage
                    {
                        Content = messageContent,
                        Type = AppMessageType.Error
                    }
                }
        };
    }
}
