from . import db

class Order(db.Model):
    __tablename__ = 'orders'
    __table_args__ = {'schema': 'basefinal'}
    order_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    order_number = db.Column(db.Integer, nullable=False)

class OrderProduct(db.Model):
    __tablename__ = 'order_products'
    __table_args__ = {'schema': 'basefinal'}
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_ID'), primary_key=True)
    product_name = db.Column(db.String, db.ForeignKey('products.product_name'), primary_key=True)

class Product(db.Model):
    __tablename__ = 'products'
    __table_args__ = {'schema': 'basefinal'}
    product_name = db.Column(db.String, primary_key=True)
    aisle = db.Column(db.String, nullable=False)
    department = db.Column(db.String, nullable=False)