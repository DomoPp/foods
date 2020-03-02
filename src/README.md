```
This project not have package.json , use for VUE project

GET    ::   /api/user/id
            /api/users
POST   ::   /api/users
PUT    ::   /api/user/id
DELETE ::   /api/user/id
```

### 1. DATABASE is "testdb"
```
--
-- Table structure for table `tbl_users`
--
 
CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);
 
--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
```

### 2. Copy all file and folder to "src"

### 3. Install Package by UI
```
mysql
cors
```

### 4. Run API
```
node api.js
```
