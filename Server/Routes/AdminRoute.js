import express, { json } from "express";
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()


router.post('/adminlogin',(req,res)=>{
    console.log(req.body);
    const sql = "SELECT * FROM  admin where  email = ? and password = ?"
    con.query(sql,[req.body.email,req.body.password],(err,result)=>{
        if(err) return res.json({loginStatus:false,Error:"Query Error"})
        if(result.length > 0) {
            const email = result[0].email
            const token = jwt.sign({role:"admin",email:email},
                "jwt_secret_key",{expiresIn:"1d"}
                
            );
            res.cookie('token',token)
            return res.json({loginStatus:true});
        }else{
            return res.json({loginStatus:false, Error:"Wrong Email or password"})
        }
    });
    
});

router.get('/get_admins',(req,res)=>{
    const sql = "SELECT * from admin";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,Result:result})
    });
});

router.post('/add_department',(req,res)=>{
    const sql = "INSERT INTO department (`name`) VALUES (?)"
    con.query(sql,[req.body.department],(err,result)=>{
        if(err){
            return res.json({Status:false,Error:"Query Error"})
        }
        return res.json({Status:true})
        
    });
});

router.get('/department',(req,res)=>{
    const sql = "SELECT *  FRom department";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,Result:result})
    })
})

router.post('/add_student',(req,res)=>{

    const sql = `INSERT INTO student (name, address, email, department_id) VALUES (?,?,?,?)`;
    const val = [req.body.name, req.body.address, req.body.email, req.body.department_id];
    con.query(sql,val,(err,result)=>{
        console.log(result);
        console.log(err);
        if(err){
            return res.json({Status:false,Error:"Query Error"})
        }
        return res.json({Status:true})

})
})
router.get('/student',(req,res)=>{
    const sql = "select s.id,s.name as sname, s.address,s.email,d.name from student s inner join department d on s.department_id=d.id";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,Result:result})
    })
})
router.delete('/delete_student/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "DELETE from student where id = ?";
    con.query(sql,[id],(err,result)=>{
        if(err){
            return res.json({Status:false,Error:"Query Error"})
        }
        console.log("Deleted");
        
        return res.json({Status: true,Result:result})
    })
})

router.get('/student/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * from student where id = ?";
    con.query(sql,[id],(err,result)=>{

        if(err) return res.json({Status:false, Error:"Query Error"})
        return res.json({Status:true,Result:result})
    })
})
router.get('/admin_count',(req,res)=>{
    const sql = "select count(id) as admin from admin";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false, Error:"Query Error"})
        return res.json({Status:true, Result:result})
    })
})
router.get('/student_count',(req,res)=>{
    const sql = "SELECT count(id) as student from student";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,Result:result})
    })
})
router.get('/department_count',(req,res)=>{
    const sql= "SELECT count(id) as department from department";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true, Result:result})
    })
})
router.put('/edit_student/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `UPDATE student set name = ?,  address = ?, email = ? , department_id = ? 
        Where id = ?`;
    const val = [
        req.body.name,
        req.body.address,
        req.body.email,
        req.body.department_id
    ]
    con.query(sql,[...val,id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true})
    })
})
export { router as adminRouter };