function Staff(user,name,password,date,email,salary,position,time){
    this.user =user;
    this.name =name;
    this.password =password;
    this.date =date;
    this.email =email;
    this.salary =salary;
    this.position =position;
    this.time =time;
    this.calcTotalSalary = function()
    {
        switch (this.position) {
            case "Sếp":
                return  Number(this.salary) * 3;
            case "Trưởng phòng":
                return  Number(this.salary) * 2;
            case "Nhân viên":
                return Number(this.salary);             
            default:
                break;
        }
    }
    this.categoryStaff = function()
    {
       if(Number(this.time) >= 192)
       {
        return "Excellent Staff";
       }
       else{
        if(Number(this.time) >= 176)
        {
            return "Good Staff"
        }
        else{
            if(Number(this.time) >= 160)
            {
                return "Pretty Staff"
            }
        }
        return "Medium Staff";
       }
    }
}

