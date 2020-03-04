const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "Express" }
];
app.get("/", (req, res) => {
    res.send('Hello World');
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found')
    res.send(course)
});

app.post('api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);

    if (result.error) return res.status(400).send(result.error)

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(courses);
    res.send(course);
})

app.put('api/courses/:id', (req, res) => {
    //Look up course
    //if not exists, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found')

    //Validate
    //if invalid, return 400 - bad request
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //update course
    course.name = req.body.name;
    //return course
    return course;
})

app.delete('api/courses/:id', (req, res) => {
    //Look up course
    //if not exists, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found')

    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    return course;
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listing on port ${port}`));
