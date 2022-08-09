
var staffList = [];

function createStaff(){
    var user = document.querySelector("#tknv").value;
    var name = document.querySelector("#name").value;
    var password = document.querySelector("#password").value;
    var date = document.querySelector("#datepicker").value;
    var email = document.querySelector("#email").value;
    var salary = document.querySelector("#luongCB").value;
    var position = document.querySelector("#chucvu").value;
    var time = document.querySelector("#gioLam").value;

    var staff = new Staff(user,name,password,date,email,salary,position,time);

    var valid = true;

     valid &= checkEmpty(staff.user,"#tbTKNV","User") 
     & checkEmpty(staff.name,"#tbTen","Tên nhân viên") 
     & checkEmpty(staff.email,"#tbEmail","Email nhân viên") 
     & checkEmpty(staff.password,"#tbMatKhau","Mật khẩu") 
     & checkEmpty(staff.date,"#tbNgay","Ngày làm việc") 
     & checkEmpty(staff.salary,"#tbLuongCB","Lương cơ bản") 
     & checkEmpty(staff.position,"#tbChucVu","Chức vụ") 
     & checkEmpty(staff.time,"#tbGiolam","Thời gian làm");
    
     if(checkEmpty(staff.name,"#tbTen","Tên nhân viên"));
     {
         valid &= checkLetter(staff.name,"#tbTen","Tên nhân viên");
     }

    valid &= checkEmail(staff.email,"#tbEmail","Email nhân viên");
    valid &= checkLength(staff.user,"#tbTKNV","User",4,6);
    if(checkNumber(staff.salary,"#tbLuongCB","Lương cơ bản") & checkNumber(staff.time,"#tbGiolam","Thời gian làm"))
    {
        valid &= checkValue(staff.salary,"#tbLuongCB","Lương cơ bản",1000000,20000000) & checkValue(staff.time,"#tbGiolam","Thời gian làm",80,200);
    }
     
    if(!valid)
     {
         return;
       
     }

    swal({
        title: "Are you sure?",
        text: "Bạn có chắc muốn thêm nhân viên này không ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Nhân viên của bạn đã được lưu vào hệ thống :)", {
            icon: "success",
          });
          staffList.push(staff);
         renderStaffList(staffList);
         saveLocalStorage(staffList,"arrNV");
         console.table(staffList);
        } else {
          swal("Bạn đã hủy lưu nhân viên này :(");
        }
      });
}

function renderStaffList(arr){
    var output = '';
    for(var i=0;i<arr.length;i++)
    {
        var obStaff = arr[i];
        obStaff.categoryStaff = function()
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
        obStaff.calcTotalSalary = function()
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
        var trNV = `
            <tr>
                <td>${obStaff.user}</td>
                <td>${obStaff.name}</td>
                <td>${obStaff.email}</td>
                <td>${obStaff.date}</td>
                <td>${obStaff.position}</td>  
                <td>${obStaff.calcTotalSalary()}</td>
                <td>${obStaff.categoryStaff()}</td>
                <td>
                <button class="btn btn-danger" onclick="deleteStaff('${obStaff.user}')">Delete</button>
                <button class="btn btn-primary" onclick="updateStaff('${obStaff.user}')" data-target="#myModal" data-toggle="modal">Update</button>
                </td>
            </tr>
        `
        output += trNV; 
    }

    document.querySelector("#tableDanhSach").innerHTML=output;
}

function saveLocalStorage(ob,key)
{
    var str = JSON.stringify(ob);
    localStorage.setItem(key,str);
}

function getLocalStorage(key)
{
    if(localStorage.getItem(key))
    {
        var str = localStorage.getItem(key);
        var ob = JSON.parse(str);
        return ob;
    }
    return undefined;
}

window.onload = function()
{
    staffList = getLocalStorage('arrNV');
    if(staffList === undefined)
    {
        staffList = [];
    }
    renderStaffList(staffList);
}

function deleteStaff(user){
    var indexDelete = -1;
    for(var i = staffList.length -1; i>=0;i--)
    {
        if(staffList[i].user === user)
        {
            //indexDelete = i;
            // break;
            staffList.splice(i,1);
        }
    }
    saveLocalStorage(staffList,"arrNV");
    renderStaffList(staffList);
    // if(indexDelete !== -1)
    // {
    //     staffList.splice(indexDelete,1);
    //     saveLocalStorage(staffList,"arrNV");
    //     renderStaffList(staffList);
    // }
}

function updateStaff(user)
{
    var nvEdit = null;
    for(var i = 0; i < staffList.length; i++)
    {
        if(staffList[i].user == user)
        {
            nvEdit = staffList[i];
            break;
        }
    }
    if(nvEdit !== null)
    {
        document.querySelector("#tknv").value = nvEdit.user;
        document.querySelector("#name").value = nvEdit.name;
        document.querySelector("#password").value = nvEdit.password;
        document.querySelector("#datepicker").value= nvEdit.date;
        document.querySelector("#email").value = nvEdit.email;
        document.querySelector("#luongCB").value = nvEdit.salary;
        document.querySelector("#chucvu").value = nvEdit.position;
        document.querySelector("#gioLam").value = nvEdit.time;
    }
}

function saveEdit()
{
    var staffUpdate = new Staff();
    staffUpdate.user =  document.querySelector("#tknv").value ;
    staffUpdate.name =  document.querySelector("#name").value ;
    staffUpdate.password =  document.querySelector("#password").value;
    staffUpdate.date =  document.querySelector("#datepicker").value;
    staffUpdate.email =  document.querySelector("#email").value;
    staffUpdate.salary =  document.querySelector("#luongCB").value;
    staffUpdate.position =  document.querySelector("#chucvu").value;
    staffUpdate.time =  document.querySelector("#gioLam").value 

    var index = -1;
    for(var i = 0; i< staffList.length; i++)
    {
        if(staffList[i].user == staffUpdate.user)
        {
            index = i;         
            break;
        }
    }
    if(index !== -1)
    {
        staffList[i] = JSON.parse(JSON.stringify(staffUpdate));
        saveLocalStorage(staffList,"arrNV");
        renderStaffList(staffList);
    }
}

var searchStaff = function ()
{
    var tuKhoa = document.querySelector("#searchName").value;
    tuKhoa = removeVietnameseTones(tuKhoa);
    var output = [];
    for(var i=0 ; i<staffList.length; i++)
    {
        var nameStaff = removeVietnameseTones(staffList[i].categoryStaff())
        if(nameStaff.search(tuKhoa) != -1 || staffList[i].user == tuKhoa)
        {
            output.push(staffList[i]);
        }
    }
    renderStaffList(output);
}

document.querySelector("#searchName").oninput = searchStaff;

document.querySelector("#btnTimNV").onclick = searchStaff;

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
