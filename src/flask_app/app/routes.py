from flask import Blueprint, jsonify, request
from .models import Order, OrderProduct, Product
from . import db

bp = Blueprint('main', __name__)


@bp.route('/id/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    try:
        # Consulta para obtener todas las órdenes del usuario especificado
        orders = Order.query.filter_by(user_id=user_id).all()
        
        # Lista para almacenar las órdenes y sus productos
        orders_with_products = []

        for order in orders:
            # Obtener los productos asociados a cada orden
            order_products = OrderProduct.query.filter_by(order_id=order.order_id).all()

            # Crear una lista de nombres de productos para la orden actual
            products = []
            for op in order_products:
                product = Product.query.filter_by(product_name=op.product_name).first()
                products.append({
                    'product_name': product.product_name,
                    'aisle': product.aisle,
                    'department': product.department
                })
            
            # Agregar la información de la orden y sus productos a la lista
            orders_with_products.append({
                'order_id': order.order_id,
                'order_number': order.order_number,
                'products': products
            })

        # Devolver la respuesta en formato JSON
        return jsonify(orders_with_products)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/api1/<int:user_id>/<string:department>', methods=['GET'])
def get_user_orders_count(user_id, department):
    try:
        count = db.session.query(Order, OrderProduct, Product) \
            .filter(Order.order_id == OrderProduct.order_id) \
            .filter(Order.user_id == user_id) \
            .filter(Product.product_name == OrderProduct.product_name) \
            .filter(Product.department == department) \
            .count()
        return jsonify({"Cantidad": count})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/api2/<path:item>', methods=['GET'])  # Cambiar a <path:item> para manejar espacios
def get_product_info(item):
    try:
        product_name = item.replace("%20", " ")  # Reemplazar %20 con espacio
        product = Product.query.filter_by(product_name=product_name).first()
        if product:
            return jsonify({
                "Producto": product.product_name,
                "Pasillo": product.aisle,
                "Categoria": product.department
            })
        else:
            return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/api3/<string:aisle>', methods=['GET'])
def get_aisle_count(aisle):
    try:
        count = db.session.query(OrderProduct, Product) \
            .filter(OrderProduct.product_name == Product.product_name) \
            .filter(Product.aisle == aisle) \
            .count()
        return jsonify({"Cantidad": count})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
