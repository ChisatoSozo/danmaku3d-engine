import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import fileUpload, { FileArray } from "express-fileupload";
import { promises } from "fs";
import path from "path";

const app = express();

// enable files upload
app.use(
    fileUpload({
        createParentPath: true,
    })
);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

interface UploadBody {
    type: "texture" | "mesh" | "sound" | "glsl" | "bulletPattern";
    gameDefinitionName: string;
}

const typeToFolderMap: { [key in UploadBody["type"]]: string } = {
    texture: "textures",
    mesh: "meshes",
    sound: "sounds",
    glsl: "glsl",
    bulletPattern: "bulletPatterns",
};

const attemptUpload = async (files: FileArray, body: UploadBody) => {
    const filesToProcess = Object.values(files);
    if (filesToProcess.length !== 1) {
        return "Must upload exactly one file";
    }
    const file = filesToProcess[0];
    if (Array.isArray(file)) {
        return "Must upload exactly one file";
    }

    await file.mv(
        path.join(__dirname, `./games/${body.gameDefinitionName}/${typeToFolderMap[body.type]}/${file.name}`)
    );

    return undefined;
};

app.post("/upload-asset", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No file uploaded",
            });
        } else {
            const body = req.body as UploadBody;
            const files = req.files;

            const error = await attemptUpload(files, body);
            console.log(error);
            if (error) {
                res.send({
                    status: false,
                    message: error,
                });
            } else {
                res.send({
                    message: "File is uploaded",
                });
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.patch("/games/:gameDefinitionName", async (req, res) => {
    const gameDefinitionName = req.params.gameDefinitionName;
    const gameDefinition = req.body.gameDefinition;
    const gameDefinitionPath = path.join(__dirname, `./games/${gameDefinitionName}/definition.json`);
    await promises.writeFile(gameDefinitionPath, gameDefinition);
    res.sendStatus(200);
});

const readDirOrEmpty = async (dir: string) => {
    try {
        const files = await promises.readdir(dir);
        return files;
    } catch (err) {
        return [];
    }
};

const listAssets = async (gameDefinitionName: string) => {
    const meshes = await readDirOrEmpty(path.join(__dirname, `./games/${gameDefinitionName}/meshes/`));
    const textures = await readDirOrEmpty(path.join(__dirname, `./games/${gameDefinitionName}/textures/`));
    const sounds = await readDirOrEmpty(path.join(__dirname, `./games/${gameDefinitionName}/sounds/`));
    const glsl = await readDirOrEmpty(path.join(__dirname, `./games/${gameDefinitionName}/glsl/`));
    const bulletPatterns = await readDirOrEmpty(path.join(__dirname, `./games/${gameDefinitionName}/bulletPatterns/`));
    return { meshes, textures, sounds, glsl, bulletPatterns };
};

app.get("/listAssets/:gameDefinitionName", async (req, res) => {
    const gameDefinitionName = req.params.gameDefinitionName;
    try {
        const assets = await listAssets(gameDefinitionName);
        res.send(assets);
    } catch (err) {
        res.send(err);
    }
});

app.get("/listGames", async (req, res) => {
    try {
        const files = await promises.readdir(path.join(__dirname, "./games/"));
        res.send(files);
    } catch (err) {
        res.send(err);
    }
});

app.use(express.static("games"));

//start app
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
