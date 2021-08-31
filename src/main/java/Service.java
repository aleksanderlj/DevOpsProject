import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@Path("test")
public class Service {
    String strang = "Halløj.. er det mig du kigger efter? Ich kann es in deinen Augen sehen-";

    @GET
    public String getTest(){
        return strang;
    }
}