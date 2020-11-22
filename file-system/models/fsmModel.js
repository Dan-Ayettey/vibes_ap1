/**
 * Created by ictte on 09/11/2020.
 */
const fs=require('fs');
const  mongoose=require('mongoose');
const Schema=mongoose.Schema;

let response=function(error){
   return {error}
};
const buffers=new Buffer.alloc(1024);
const writeFile=function (path,flag,fileName,data) {

            if(fs.existsSync(path + fileName)){
                return {isExist:true}
            }else {
                fs.open(path + fileName,flag, response);
                const buffer = new Buffer.from(data);
                fs.writeFile(path + fileName, buffer, 'binary', (data)=>data);
                return {isCreated:true}
            }
    };




const getFileStat=function (file) {

       if(fs.existsSync(path + fileName)){
                const stat= fs.statSync(file);
                try {
                    if(!stat.isFile()){
                        return stat
                    }else {
                        return {isExist:stat.isFile(),stat}
                    }

                }catch (e){
                    return e
                }
            }
                return false;
};
const readFile=function (path) {
    fs.open(path,'r+',function (error,data) {
        if (error) {
            return error
        } else {
            fs.readFile(data, buffers, buffers.length, 0, function (err, bytes) {
                if (err) {
                    return err.message
                } else {

                    fs.close(data, function () {
                        return bytes;
                    });

                }
            })
        }
    })
};

const deleteFile=function (path) {
    fs.open(path,r,function (err,data) {
        if(err){
            return err.message
        }else {

           fs.unlink(data,function (error) {

               if(error){
                   return error.message
               }else {
                   return true;
               }

           })

        }
    })
};
const updateFile=function (path) {
    fs.open(path,'r+',function (err,data) {
        if(err){
            return err.message
        }else {
            return true;
        }
    })
};

const makeDir=function (path,name) {
    fs.readdir(path, function (error, dir) {
        if (error) {
            return error.message
        } else {
            fs.mkdir(path+'/'+name, function (err, file) {
                if (err) {
                    return err.message
                } else {
                    return file;
                }

            })
        }



    });
};

const deleteDir=function (path) {
    fs.readdir(path,function (error,dir) {
        fs.rmdir(dir,function (err) {
            if(err){
                return err.message
            }else {
                return dir;
            }
        })
    });
};

const FileSchema=new Schema({
    fileStat:{
        type:Array,
        required:[true,'The stat information is required ext:[{url:"http://hey.c"}] exec']
    },
    link:{
      type:[],
    },
    _user_id:{
        type:String,
        required:[true,'User id is needed']

    }
});

const fileModel=mongoose.model("FileStat",FileSchema);
module.exports={
    writeFile,
    readFile,
    deleteFile,
    makeDir,
    deleteDir,
    fileModel,
    getFileStat,
    updateFile,
};
