float collision = 0.0;

for(int i = 0; i < MAX_ENEMIES; i ++){
    int offset = i * 3;
    vec3 enemyPosition = vec3(enemyPositions[offset], enemyPositions[offset + 1], enemyPositions[offset + 2]);
    float enemyBulletDistance = distance(position, enemyPosition);
    float close = float(enemyBulletDistance < enemyRadii[i]);
    collision = max(collision, close * (float(MAX_ENEMIES) + float(i)));
}


//Bullet exists in scene?
collision = collision * float(position.y > -500.);

collisionPosition = position;
collisionID = collision;