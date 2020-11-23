
const {validationResult}=require('../configurations/fileSchema/fsmSchema.js');
/**
  Created by ictte on 09/11/2020.
 */
const {makeDir,writeFile,getFileStat,deleteFile,fileModel}=require('../../file-system/models/fsmModel');
const fetch = require('node-fetch');
function getUrlExtension( url ) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}


async function picoFetch(request) {
        const fetcher = await fetch(request.body.dataUrl);
        return fetcher.buffer();
}
const writeFileController= async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        try {

            let sortFile = request.files ? request.files.upload : ['http','https'].includes(request.body.dataUrl.substr(0,5));
            if(sortFile) {
                const temp = sortFile.data ? sortFile : await picoFetch(request);
                const extension = temp ? getUrlExtension(request.body.dataUrl) : temp.mv('./uploads/' + temp.name);
                const _user_id = request.body.id ? request.body.id : request.params.id;
                const dir = makeDir(getFolderPath('file-system/folders'), _user_id);
                const buffer = ['http', 'https'].includes(request.body.dataUrl.substr(0, 5)) ? await picoFetch(request) : temp.data;
                if (dir) {
                    try {
                          const write= await writeFile(getFileDirectoryPath('file-system/folders', _user_id), 'r+', request.body.fileName + '.' + extension, buffer);
                          if(write.isExist){
                              response.status(200).json({fileName:request.body.fileName,write})
                          }else {
                              response.status(201).json({fileName:request.body.fileName,write})
                          }

                    } catch (e) {
                        console.log(e);
                        response.status(400).json(e.message)
                    }
                } else {

                    try {
                    const write= await writeFile(getFileDirectoryPath('file-system/folders', _user_id), 'r+', request.body.fileName + '.' + extension, buffer);
                    if(write.isExist){
                        response.status(200).json({fileName:request.body.fileName,write})
                    }else {
                        response.status(201).json({fileName:request.body.fileName,write})
                    }

                } catch (e) {
                    console.log(e);
                        next(e.message)
                }
                }


            }

            }catch (e){
                console.log(e);
                next(e.message)
            }
        }

    };

const getFolderPath=function (folderDir) {
    return  process.cwd()+'/'+folderDir;
};
const getFileDirectoryPath=function (folderDir,userId) {
    return  process.cwd()+'/'+folderDir+'/'+userId+'/';
};
const getFile=function (request) {
    const path= process.cwd()+'/file-system/folders';
    const _user_id=request.body.id ? request.body.id:request.params.id;
    const file=request.body.fileName+'.'+getUrlExtension(request.body.dataUrl);
 return   path+'/'+_user_id+'/'+file;
};

const createStat=async function (request,response) {


    try {
        const stat = getFileStat(getFile(request));

        if (stat) {

            request.body._links = [

                {
                    rel: 'self', href: '/v1/comments/user/:id', action: 'POST',
                    types: ["application/x-www-form-urlencoded"], authorization: 'token'
                },
                {
                    rel: 'self', href: '/v1/comments/:cid/managed-commented-user/:id', action: 'PUT',
                    types: ["application/x-www-form-urlencoded"], authorization: 'token'
                },
                {
                    rel: 'self', href: '/v1/comments/:id', action: 'GET',
                    types: ["application/x-www-form-urlencoded"], authorization: 'token'
                },
                {
                    rel: 'self', href: '/v1/comments/user/:id', action: 'GET',
                    types: ["application/x-www-form-urlencoded"], authorization: 'token'
                },
                {
                    rel: 'self', href: '/v1/comments/:id/activate-contact', action: 'PUT',
                    types: ["application/x-www-form-urlencoded"], authorization: 'token'
                },
                {
                    rel: 'self', href: '/v1/comments/:id/deactivate-contact', action: 'PUT',
                    types: ["application/x-www-form-urlencoded"], authorization: 'token'
                },
                {
                    rel: 'self', href: '/v1/comments/:cid/managed-commented-user/:id', action: 'DELETE',
                    types: ["application/x-www-form-urlencoded"], authorization: 'token'
                },
                {
                    rel: 'self', href: '/v1/admins/managed-commented-user/:id', action: 'PUT',
                    types: ["application/x-www-form-urlencoded"], authorization: 'token'
                },
                {
                    rel: 'self', href: '/v1/admins/managed-commented-user/:id', action: 'DELETE',
                    types: ["application/x-www-form-urlencoded"], authorization: 'token'
                },
            ];
            request.body.fileStat = stat;
            request.body._user_id = request.body.id;
            try {
                if(stat.isExist){
                    response.status(201).json({stat, isExist: stat.isExist})
                }else {
                    const fModel_2 = await fileModel.create(request.body);
                    response.status(201).json({fModel_2, isCreated: true})
                }

            } catch(e){
                console.log(e)
                response.status(400).json({e});
            }
        }
    } catch(e){
            response.status(400).json({e});
        }



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

                    if(bytes.length >0){

                        return bytes
                    }
                    fs.close(data, function (err) {
                        if (err){
                            console.log(err)
                        }else {
                            console.log('file closed')
                        }
                    });

                }
            })
        }
    })
};

const deleteFileByUserId=async function (request,response) {
       try {
           let rmFile= await deleteFile(getFile(request));
           response.status(200).json({rmFile,isDeleted:rmFile});
       }catch (e){
           response.status(400).json(e.message);
       }
};

const deleteFolderByUserId=function (request,response) {
    fs.readdir(getFileDirectoryPath(request,request._user_id),function (error,dir) {
        fs.rmdir(dir,function (err) {
            if(err){
                 response.status(401).json({err})
            }else {
                response.status(200).json({isDeleted:true});
            }
        })
    });
};
const readDirectoryByUserId=function (request,response) {
    fs.readdir(getFileDirectoryPath(request,request._user_id),function (error,dir) {

            if(error){
                response.status(401).json({error})
            }else {
               response.status(200).json({isDir:true,dir});
            }

    });
};
module.exports={
    writeFileController,
    readFile,
    deleteFileByUserId,
    makeDir,
    deleteFolderByUserId,
    readDirectoryByUserId,
    createStat,
};
