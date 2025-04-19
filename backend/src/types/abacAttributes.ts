interface UserAttributes {
    id: string;
    role: string;
    team: string;
    clearanceLevel: number;
    department: string;
  }
  
interface ResourceAttributes {
    ownerId?: string;
    sensitivity?: number;
    projectId?: string;
    resourceType?: string;
  }
  
interface EnvironmentAttributes {
    requestTime: Date;
    ipAddress: string;
    location?: string;
  }
  
interface ABACContext {
    user: UserAttributes;
    resource: ResourceAttributes;
    environment: EnvironmentAttributes;
}
  
type Policy = (ctx: ABACContext) => boolean;
  