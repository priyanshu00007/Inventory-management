import express, { Request, Response } from 'express';
import cors from 'cors';
import prisma from './prisma';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Create Product
app.post('/api/v1/products', async (req: Request, res: Response) => {
  try {
    const { sku, name, description, category, unitPrice, costPrice, quantity, reorderLevel, isActive } = req.body;

    // Quick validation
    if (!sku || !name || !category || unitPrice === undefined || costPrice === undefined) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const product = await prisma.product.create({
      data: {
        sku,
        name,
        description,
        category,
        unitPrice: Number(unitPrice),
        costPrice: Number(costPrice),
        quantity: quantity !== undefined ? Number(quantity) : 0,
        reorderLevel: reorderLevel !== undefined ? Number(reorderLevel) : 10,
        isActive: isActive !== undefined ? isActive : true
      }
    });
    res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ success: false, message: 'Product with this SKU already exists' });
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Read All Products
app.get('/api/v1/products', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Read Single Product
app.get('/api/v1/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Update Product
app.put('/api/v1/products/:id', async (req: Request, res: Response) => {
  try {
    const { sku, name, description, category, unitPrice, costPrice, quantity, reorderLevel, isActive } = req.body;

    const dataToUpdate: any = {};
    if (sku !== undefined) dataToUpdate.sku = sku;
    if (name !== undefined) dataToUpdate.name = name;
    if (description !== undefined) dataToUpdate.description = description;
    if (category !== undefined) dataToUpdate.category = category;
    if (unitPrice !== undefined) dataToUpdate.unitPrice = Number(unitPrice);
    if (costPrice !== undefined) dataToUpdate.costPrice = Number(costPrice);
    if (quantity !== undefined) dataToUpdate.quantity = Number(quantity);
    if (reorderLevel !== undefined) dataToUpdate.reorderLevel = Number(reorderLevel);
    if (isActive !== undefined) dataToUpdate.isActive = isActive;

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: dataToUpdate
    });
    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    console.error('Error updating product:', error);
    if (error.code === 'P2025') {
       return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (error.code === 'P2002') {
      return res.status(409).json({ success: false, message: 'Product with this SKU already exists' });
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Delete Product
app.delete('/api/v1/products/:id', async (req: Request, res: Response) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id }
    });
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
     if (error.code === 'P2025') {
       return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
