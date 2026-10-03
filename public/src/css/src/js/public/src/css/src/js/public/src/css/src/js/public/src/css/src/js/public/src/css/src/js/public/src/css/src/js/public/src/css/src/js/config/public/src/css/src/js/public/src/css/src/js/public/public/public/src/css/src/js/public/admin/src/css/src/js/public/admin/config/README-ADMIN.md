# DANHAYS Admin Panel Documentation

## Overview
The DANHAYS Admin Panel is a comprehensive management system for the DANHAYS e-commerce platform. It provides complete control over products, orders, users, brands, and more.

## Access
- **URL**: `/admin/dashboard.html`
- **Requirements**: Admin account with proper credentials
- **Authentication**: Required (Session-based)

## Main Features

### 1. Dashboard
- Real-time KPI metrics (revenue, orders, users, AOV)
- Sales charts and analytics
- Order status distribution
- Recent orders list
- Top-performing products
- Quick access to all management sections

### 2. Product Management
- **Features**:
  - Add, edit, delete products
  - Bulk product upload
  - Price and inventory management
  - Shade variants for makeup products
  - Product images and videos
  - SEO optimization
  - Featured product selection
  - Stock level tracking

- **Access**: `Dashboard → Products`

### 3. Order Management
- **Features**:
  - View all orders
  - Filter by status (pending, processing, shipped, delivered)
  - Update order status
  - View order details
  - Process refunds
  - Print shipping labels
  - Customer communication

- **Statuses**: Pending → Processing → Shipped → Delivered
- **Access**: `Dashboard → Orders`

### 4. User Management
- **Features**:
  - View user profiles
  - Edit user information
  - View order history
  - Manage loyalty tier
  - View points balance
  - Send promotional messages
  - Suspend/restore accounts

- **User Tiers**: Bronze, Silver, Gold, Diamond
- **Access**: `Dashboard → Users`

### 5. Brand Management
- **Features**:
  - Add new brands
  - Edit brand information
  - View brand products
  - Track brand performance
  - Manage brand relationships
  - Revenue tracking per brand

- **Access**: `Dashboard → Brands`

### 6. Category Management
- **Features**:
  - Create/edit categories
  - Manage subcategories
  - Organize product hierarchy
  - Track products per category
  - Status management (active/inactive)

- **Access**: `Dashboard → Categories`

### 7. Inventory Management
- **Features**:
  - Stock level tracking
  - Low stock alerts
  - Inventory forecasting
  - SKU management
  - Stock adjustments
  - Reorder management

- **Access**: `Dashboard → Inventory`

### 8. Payment Management
- **Features**:
  - Transaction history
  - Settlement tracking
  - Refund processing
  - Payment gateway configuration
  - Multi-currency support
  - Fraud detection

- **Access**: `Dashboard → Payments`

### 9. Analytics & Reports
- **Reports Available**:
  - Sales reports
  - Customer insights
  - Product performance
  - Revenue trends
  - Inventory reports
  - Payment reports

- **Export Options**: CSV, PDF, XLSX
- **Access**: `Dashboard → Reports`

### 10. Settings
- **System Settings**:
  - Store configuration
  - Shipping settings
  - Payment gateway credentials
  - Email settings
  - Security options
  - Backup settings

- **Access**: `Dashboard → Settings`

### 11. Admin Management
- **Features**:
  - Add/remove admin users
  - Manage permissions
  - Set admin roles (Admin, Moderator, Staff)
  - Activity logging
  - Security audits

- **Access**: `Dashboard → Admin Users`

## User Roles & Permissions

### Admin (Level 10)
- Full access to all features
- Can manage all users
- Can manage payments
- Can view analytics
- Can access settings

### Moderator (Level 5)
- Can manage products
- Can manage orders
- Can view analytics
- Cannot manage users
- Cannot access settings

### Staff (Level 2)
- Can manage orders only
- Cannot manage products
- Cannot view analytics
- Limited access

## Dashboard Metrics

### KPI Cards
1. **Total Revenue**: Monthly revenue (EUR)
2. **Total Orders**: Number of orders this month
3. **Total Users**: Registered users
4. **Average Order Value**: AOV per order

### Charts
- Sales over time (line chart)
- Order status distribution (pie chart)
- Top categories (bar chart)
- Customer growth (area chart)

### Recent Data
- Last 5 orders
- Top 5 products
- Recent user registrations
- Latest reviews

## Notification System

### Alert Types
- New orders (real-time)
- Low stock alerts
- New user registrations
- Payment issues
- System maintenance alerts

### Notification Channels
- Dashboard notifications (in-app)
- Email notifications
- SMS notifications
- Webhook notifications

## Quick Actions

### Common Tasks

**Add New Product**
1. Click "Dashboard" → "Products"
2. Click "+ Add Product"
3. Fill in product details
4. Click "Add Product"

**Process Order**
1. Click "Orders"
2. Find order in list
3. Click "View"
4. Update status
5. Save changes

**Manage User**
1. Click "Users"
2. Find user in list
3. Click "Edit"
4. Update information
5. Save changes

**Generate Report**
1. Click "Reports"
2. Select report type
3. Choose date range
4. Click "Generate"
5. Download or view

## API Integration

### Available Endpoints
- `GET /api/admin/dashboard` - Get dashboard data
- `GET /api/admin/products` - Get product list
- `POST /api/admin/products` - Add product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Get orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/users` - Get users
- `GET /api/admin/analytics` - Get analytics

### Authentication
All API calls require:

## Security Features

### Admin Security
- Two-factor authentication (2FA) required
- Session timeout after 60 minutes
- IP whitelist support
- Admin activity logging
- Password policy enforcement
- Encryption of sensitive data

### Data Protection
- PCI DSS compliance
- SSL/TLS encryption
- Regular backups
- Data retention policies
- GDPR compliance

## Troubleshooting

### Common Issues

**Login Fails**
- Check admin account is active
- Verify credentials
- Check if 2FA is enabled
- Look for account lockouts

**Changes Not Saving**
- Check internet connection
- Verify user permissions
- Check browser cache
- Try different browser

**Reports Not Generating**
- Verify date range
- Check data availability
- Wait for processing
- Contact support

**Notifications Not Appearing**
- Check notification settings
- Verify email settings
- Check notification permissions
- Clear browser cache

## Best Practices

### Daily Operations
1. Check dashboard KPIs first thing
2. Process pending orders
3. Check for low stock alerts
4. Review new user registrations
5. Check for payment issues

### Weekly Tasks
1. Generate sales reports
2. Review customer metrics
3. Check product performance
4. Analyze customer feedback
5. Plan promotions

### Monthly Tasks
1. Full financial reconciliation
2. Customer retention analysis
3. Inventory planning
4. Security audit
5. Backup verification

## Support & Help

### Resources
- Documentation: `/docs/admin`
- Video Tutorials: `https://youtube.com/danhays`
- FAQ: `/admin/faq`
- Live Chat: Available 24/7
- Email: `admin-support@danhays.com`

### Contact
- **Email**: support@danhays.com
- **Phone**: +32-2-123-4567
- **Support Hours**: 24/7
- **Response Time**: < 1 hour

---

**Version**: 1.0  
**Last Updated**: January 2026  
**Maintained By**: DANHAYS Dev Team
