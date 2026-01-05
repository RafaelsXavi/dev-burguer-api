import * as Yup from 'yup';
import Category from '../models/Category.js';
import fs from 'fs';
import path from 'path';

class CategoryController {

    async store(request, response) {

        const schema = Yup.object({
            name: Yup.string().required(),
        });

        try {
            schema.validateSync(request.body,{ abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { name } = request.body;
        const file = request.files.find(f => f.fieldname === 'file');
        if (!file) {
            return response.status(400).json({ error: 'File is required' });
        }
        const { filename } = file;

        const existingCategory = await Category.findOne({
            where: { name },
        });

        if (existingCategory) {
            return response.status(400).json({ error: "Category already exists" });
        }

        const newCategory = await Category.create({
            name,
            path: filename,
        });

        return response.status(201).json(newCategory);
    }

    
    async update(request, response) {

        const schema = Yup.object({
            name: Yup.string(),
        });

        try {
            schema.validateSync(request.body,{ abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { name } = request.body;
        const { id } = request.params;

        let path
        const file = request.files.find(f => f.fieldname === 'file');
        if (file) {
            path = file.filename;
        }

        const existingCategory = await Category.findOne({
            where: { name },
        });

        if (existingCategory && existingCategory.id !== parseInt(id)) {
            return response.status(400).json({ error: "Category already exists" });
        }

        await Category.update({
            name,
            path,
        }, {
            where: { id },
        });

        return response.status(201).json();
    }


    async index(_request, response) {
        const categories = await Category.findAll();

        return response.status(200).json(categories);
    }
}

export default new CategoryController();
