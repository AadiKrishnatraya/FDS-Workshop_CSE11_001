import fs from "node:fs/promises"

const filePath = "userData.txt"

    async function createFile(content){
        try{    
            await fs.writeFile(filePath , content, "UTF8");
            console.log("File Created Successfully");
        } catch (err){
            console.log("Error is", err);
        }
    }
    async function readFile(){
        try{
            const content = await fs.readFile(filePath , "UTF8");
            console.log(content);
        }catch(err){
            console.log("Error is:", err);
        }
    }
    async function appendFile(content){
        try{
            await fs.appendFile(filePath , content ,"UTF8");
            console.log("Append success");
        }catch(err){
            console.log("Error found:", err);
        }
    }
    async function deleteFile() {
        try{
            await fs.unlink(filePath);
            console.log("File Deleted");
        }catch(err){
            console.log("Error Found:", err);
        }
    }

// function calling
async function seq(){
    await createFile("This is user data. Please use carefully");
    await readFile()
    await appendFile("Always protect the data")
    await readFile();
    await setTimeout(()=>{
        deleteFile();
    },10000);
    
}

seq();

    
