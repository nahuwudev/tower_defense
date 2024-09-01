import { AddNewEnemy } from "../Entity/Enemy";
import { Game } from "../Scene/Game";
import { EventText } from "../UI/EventText";

export class Director {
    scene: Game;
    nextEnemy: number;
    enemySpawnTime: number = 5 * 1000;
    enemyMoveSpeed = 1/40000
    enemyDropGold = 20;
    private lastTurretCount: number = 0;

    constructor(scene: Game) {
        this.scene = scene;
        this.nextEnemy = 0;
    }

    update(time: number) {
        this.spawnEnemy(time);
        this.spawnEnemiesWave();
    }

    spawnEnemy(time: number) {
        if (time > this.nextEnemy) {
            // Obtén un enemigo del grupo
            const enemy = this.scene.enemies.get();
    
            // Construye un nuevo enemigo
            const newEnemy = new AddNewEnemy(this.scene)
                .setAttackDamage(20)
                .setSpeed(this.enemyMoveSpeed)
                .setHealth(100)
                .setDropGold(this.enemyDropGold)
                .build();
    
            if (enemy) {
                // Configura el nuevo enemigo en lugar del enemigo obtenido del grupo
                newEnemy.setActive(true);
                newEnemy.setVisible(true);
    
                // Seleccionar aleatoriamente un camino
                const path = this.scene.paths[
                    Math.floor(Math.random() * this.scene.paths.length)
                ];
                // Iniciar el nuevo enemigo en el camino seleccionado
                newEnemy.startOnPath(path);
    
                // Elimina el enemigo antiguo del grupo si es necesario
                enemy.setActive(false);
                enemy.setVisible(false);
    
                // Añade el nuevo enemigo al grupo
                this.scene.enemies.add(newEnemy);
    
                // Programar el siguiente enemigo
                this.nextEnemy = time + this.enemySpawnTime;
            }
        }
    }

    spawnEnemiesWave() {
        const currentTurretCount = this.scene.player.turrets.getLength();

        if (
            currentTurretCount >= 5 &&
            currentTurretCount > this.lastTurretCount + 4
        ) {
            new EventText(
                this.scene,
                this.scene.cameras.main.centerX,
                this.scene.cameras.main.centerY,
                "SOBREVIVIE A LA HORDA",
            );

            for (let i = 0; i < 5; i++) {
                const newEnemy = new AddNewEnemy(this.scene)
                    .setHealth(120)
                    .setSpeed(this.setEnemySpeed(3))
                    .setAttackDamage(25)
                    .build();

                const enemy = this.scene.enemies.get();

                if (enemy) {
                    enemy.setActive(true);
                    enemy.setVisible(true);

                    const path = this.scene.paths[
                        Math.floor(Math.random() * this.scene.paths.length)
                    ];

                    enemy.startOnPath(path);

                    this.scene.enemies.add(newEnemy);
                }
            }
            // Actualizamos el contador al nuevo número de torretas después de generar la oleada
            this.lastTurretCount = currentTurretCount;
        }
    }

    setEnemySpeed(speed: number) {
        const calc = 1 / (speed * 10000)
        return this.enemyMoveSpeed = calc;
    }
}
