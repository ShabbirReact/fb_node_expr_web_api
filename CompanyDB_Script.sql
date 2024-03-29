SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[EmployeeInfo]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[EmployeeInfo](
	[EmpNo] [int] IDENTITY(1,1) NOT NULL,
	[EmpName] [varchar](50) NOT NULL,
	[Salary] [decimal](18, 0) NOT NULL,
	[DeptName] [varchar](50) NOT NULL,
	[Designation] [varchar](50) NOT NULL,
 CONSTRAINT [PK_EmployeeInfo] PRIMARY KEY CLUSTERED 
(
	[EmpNo] ASC
)WITH (PAD_INDEX  = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GetAllEmployeeBySalary]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[GetAllEmployeeBySalary]
    (
        @Salary int
    )
AS
        Select * from EmployeeInfo where Salary>@Salary
    RETURN
' 
END
GO
insert into EmployeeInfo values('Sam',5000,'IT','Developer')
GO
insert into EmployeeInfo values('T.M. Sabnis',13000,'Accounts','Lead')
GO
